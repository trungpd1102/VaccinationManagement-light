'use strict';

const AccessService = require('../services/access.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');
const { HEADER } = require('../constants/index');

class AccessController {
	handlerRefreshToken = async (req, res, next) => {
		// V1
		// new SuccessResponse({
		// 	message: 'Get token successfully!',
		// 	metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
		// }).send(res);

		// V2 fixed, no need accessToken
		new SuccessResponse({
			message: 'Get token successfully!',
			metadata: await AccessService.handleRefreshTokenV2({
				refreshToken: req.refreshToken,
				user: req.user,
				keyStore: req.keyStore,
			}),
		}).send(res);
	};
	logout = async (req, res, next) => {
		new SuccessResponse({
			message: 'Logout successfully!',
			metadata: await AccessService.logout(req.keyStore),
		}).send(res);
	};

	login = async (req, res, next) => {
		new SuccessResponse({
			metadata: await AccessService.login(req.body),
		}).send(res);
	};

	signUp = async (req, res, next) => {
		/**
		 * 200 OK
		 * 201 CREATED
		 */
		//
		new CREATED({
			message: 'Registed OK!',
			metadata: await AccessService.signUp({
				payload: req.body,
				createdUserId: req.headers[HEADER.CLIENT_ID],
			}),
			// options: {
			// 	limit: 10,
			// },
		}).send(res);
	};
}

module.exports = new AccessController();
