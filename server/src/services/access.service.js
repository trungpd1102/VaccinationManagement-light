'use strict';

const crypto = require('crypto');

const userModel = require('../models/user.model');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, verifyJWT } = require('../utils/authUtils');
const { getInfoData } = require('../utils/lodashUtils');
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response');
const userService = require('./user.service');
const { hashPassword } = require('../utils/hashPassWordUtils');

class AccessService {
	/**
	 * Checks this token used
	 */
	static handleRefreshToken = async (refreshToken) => {
		// console.log('handleRefreshToken', { refreshToken });
		// check xem token da duoc su dung hay chua
		const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
		if (foundToken) {
			// decode xem ai da su dung token het han
			const { userId, email } = await verifyJWT(refreshToken, foundToken.privateKey);
			// console.log({ userId, email });
			// xoa tat ca key trong keyStore
			await KeyTokenService.deleteKeyById(userId);
			throw new ForbiddenError('Something went happend!! Pls relogin');
		}

		const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
		// console.log({ holderToken });
		if (!holderToken) throw new AuthFailureError('User not registered, holderToken');

		// verify token
		const { userId, email } = await verifyJWT(refreshToken, holderToken.privateKey);
		console.log('[2]--', { userId, email });

		// check userId
		const foundUser = await userService.findByEmail({ email });
		if (!foundUser) throw new AuthFailureError('User not registered, foundUser');

		// create new token pair
		const tokens = await createTokenPair(
			{ userId, email },
			holderToken.publicKey,
			holderToken.privateKey
		);

		//update token
		await KeyTokenService.updateKeyById({
			id: holderToken._id,
			oldToken: refreshToken,
			newToken: tokens.refreshToken,
		});

		return {
			user: { userId, email },
			tokens,
		};
	};
	/**
	 * Checks this token used
	 */
	static handleRefreshTokenV2 = async ({ refreshToken, user, keyStore }) => {
		const { userId, email } = user;

		if (keyStore.refreshTokensUsed.includes(refreshToken)) {
			await KeyTokenService.deleteKeyById(userId);
			throw new ForbiddenError('Something went happend!! Pls relogin');
		}

		if (keyStore.refreshToken !== refreshToken) {
			throw new AuthFailureError('User not registered');
		}

		const foundUser = await userService.findByEmail({ email });
		if (!foundUser) throw new AuthFailureError('User not registered, foundUser');

		// create new token pair
		const tokens = await createTokenPair(
			{ userId, email },
			keyStore.publicKey,
			keyStore.privateKey
		);

		//update token
		await KeyTokenService.updateKeyById({
			id: keyStore._id,
			oldToken: refreshToken,
			newToken: tokens.refreshToken,
		});

		return {
			user,
			tokens,
		};
	};

	static logout = async (keyStore) => {
		const delKey = await KeyTokenService.removeToken(keyStore._id);

		return delKey;
	};

	/*
		1 - check email in dbs
		2 - match password
		3 - create AccessToken vs RefreshToken and save
		4 - generate tokens
		5 - get data return login
	*/
	static login = async ({ emailOrUsername, password, refresToken = null }) => {
		//1.
		const foundUser = await userService.findByEmailOrUsername({ emailOrUsername });
		if (!foundUser) throw new BadRequestError('User not registered');
		if (!foundUser.isActive) throw new AuthFailureError('User is locked');

		//2.
		// const matchPassword = bcrypt.compare(password, foundUser.password);
		const matchPassword = hashPassword(password) === foundUser.password;
		console.log({ matchPassword });
		if (!matchPassword) throw new AuthFailureError('Authentication failed');

		//3.
		const privateKey = crypto.randomBytes(64).toString('hex');
		const publicKey = crypto.randomBytes(64).toString('hex');

		//4.
		const { _id: userId } = foundUser;
		const tokens = await createTokenPair({ userId, email: foundUser.email }, publicKey, privateKey);

		await KeyTokenService.createKeyToken({
			userId,
			refreshToken: tokens.refreshToken,
			privateKey,
			publicKey,
		});
		console.log({ foundUser });
		return {
			user: getInfoData({
				fields: ['_id', 'username', 'email', 'coSoTiemChung', 'kho', 'vaiTros'],
				object: foundUser,
			}),
			// user: getInfoData({
			// 	fields: ['_id', 'username', 'email', 'coSoTiemChung'],
			// 	object: foundUser,
			// }),
			tokens,
		};
	};

	static signUp = async ({ payload, createdUserId }) => {
		// Step 1: check mail existed
		// lean() returns JS object
		const holderUserByEmail = await userModel.findOne({ email: payload.email }).lean();
		if (holderUserByEmail) {
			throw new BadRequestError('Error: email are already registered!');
		}
		const holderUserByUsername = await userModel.findOne({ username: payload.username }).lean();
		if (holderUserByUsername) {
			throw new BadRequestError('Error: username are already registered!');
		}

		// const passwordHash = await bcrypt.hash(payload.password, 10);
		const passwordHash = hashPassword(payload.password);
		payload.password = passwordHash;

		const newUser = await userService.create({ payload, userId: createdUserId });

		if (newUser) {
			// created privateKey, publicKey
			// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
			// 	modulusLength: 4096,
			// 	publicKeyEncoding: {
			// 		type: 'pkcs1', //pkcs8
			// 		format: 'pem',
			// 	},
			// 	privateKeyEncoding: {
			// 		type: 'pkcs1',
			// 		format: 'pem',
			// 	},
			// });

			const privateKey = crypto.randomBytes(64).toString('hex');
			const publicKey = crypto.randomBytes(64).toString('hex');

			const keyStore = await KeyTokenService.createKeyToken({
				userId: newUser._id,
				publicKey,
				privateKey,
			});

			if (!keyStore) throw new BadRequestError('Error: keyStore error!');

			// const publicKeyObject = crypto.createPublicKey(keyStore);
			// console.log(`PublickeyObject::`, publicKeyObject);

			// Created token pair
			const tokens = await createTokenPair(
				{ userId: newUser._id, email: payload.email },
				publicKey,
				privateKey
			);
			console.log(`Create token success::`, tokens);

			return {
				code: 201,
				metadata: {
					user: getInfoData({ fields: ['_id', 'username', 'email'], object: newUser }),
					tokens,
				},
			};
		}

		return {
			code: 200,
			metadata: null,
		};
	};
}

module.exports = AccessService;
