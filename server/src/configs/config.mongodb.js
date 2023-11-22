'use strict';

const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 3055,
	},
	db: {
		host: process.env.DEV_DB_HOST || 'localhost',
		port: process.env.DEV_DB_PORT || 27017,
		name: process.env.DEV_DB_NAME || 'tiemchung',
	},
};

const pro = {
	app: {
		port: process.env.PRO_APP_PORT || 3055,
	},
	db: {
		host: process.env.PRO_DB_HOST || 'mongo',
		port: process.env.PRO_DB_PORT || 27017,
		name: process.env.PRO_DB_NAME || 'tiemchung',
	},
};

const config = { dev: dev, pro: pro };
const env = process.env.NODE_ENV || 'dev';
console.log({ env });

module.exports = config[env];
