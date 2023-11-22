'use strict';

const keyTokenModel = require('../models/keyToken.model');
const { Types } = require('mongoose');

class KeyTokenService {
	static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
		try {
		
			const filter = { user: userId },
				update = {
					publicKey,
					privateKey,
					refreshTokensUsed: [],
					refreshToken,
				},
				options = { upsert: true, new: true };

			const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
			return tokens ? tokens.publicKey : null;
		} catch (error) {
			return error;
		}
	};

	static findByUserId = async (userId) => {
		return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
	};

	static removeToken = async (id) => {
		return await keyTokenModel.findByIdAndRemove(id);
	};

	static findByRefreshTokenUsed = async (refreshToken) => {
		return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
	};

	static findByRefreshToken = async (refreshToken) => {
		console.log('keyToken Service', { refreshToken });
		return await keyTokenModel.findOne({ refreshToken }).lean();
	};

	static deleteKeyById = async (userId) => {
		return await keyTokenModel.deleteOne({ user: userId });
	};

	static updateKeyById = async ({ id, oldToken, newToken }) => {
		return await keyTokenModel.updateOne(
			{ _id: id },
			{
				$set: {
					refreshToken: newToken,
				},
				$addToSet: {
					refreshTokensUsed: oldToken,
				},
			}
		);
	};
}

module.exports = KeyTokenService;
