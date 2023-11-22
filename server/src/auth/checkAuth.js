'use strict';

const { ForbiddenError } = require('../core/error.response');
const { findById } = require('../services/apikey.service');

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			throw new ForbiddenError('Forbidden error');
		}

		// check objKey
		const objKey = await findById(key);
		// console.log({ objKey });
		if (!objKey) {
			throw new ForbiddenError('Forbidden error');
		}
		req.objKey = objKey;
		return next();
	} catch (error) {
		return res.status(403).json({ message: error.message });
	}
};

const permission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({ message: 'Permission denied' });
		}

		// console.log('Permissions::', req.objKey.permissions);
		const validPermission = req.objKey.permissions.includes(permission);
		// console.log({ validPermission });
		if (!validPermission) {
			return res.status(403).json({
				message: 'Permission denied',
			});
		}

		return next();
	};
};

module.exports = {
	apiKey,
	permission,
};
