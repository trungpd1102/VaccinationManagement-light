'use strict';

const mongoose = require('mongoose');

const { countConnection } = require('../helpers/check.connect');
const {
	db: { host, port, name },
} = require('../configs/config.mongodb.js');
const connectURL = `mongodb://${host}:${port}`;

class Database {
	constructor() {
		this.connect();
	}

	// Connect to MongoDB
	connect(type = 'mongodb') {
		if (process.env.NODE_ENV === 'dev') {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}

		mongoose
			.connect(connectURL, {
				dbName: name,
				user: process.env.DB_USER,
				pass: process.env.DB_PASSWORD,
				maxPoolSize: 50,
			})
			.then(() => {
				console.log(`MongoDB connect to PRO: ${connectURL} successfully!`, countConnection());
			})
			.catch((err) => console.log(`Mongo connect error: ${err}`));
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
