'use strict';

const mongoose = require('mongoose');
const os = require('os');

const _SECONDS = 5000;

const countConnection = () => {
	const numConnection = mongoose.connections.length;
	console.log(`number of connections: ${numConnection}`);
};

const checkOverload = () => {
	setInterval(() => {
		const numConnection = mongoose.connections.length;
		const numCores = os.cpus().length;
		const memoryUsage = process.memoryUsage().rss;

		// Example maximum number of connections based on the number of cores
		const maxConnections = numCores * 4;

		console.log(`Active connections: ${numConnection}`);
		console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

		if (numConnection > maxConnections) {
			console.log(`Connection overload detected!`);
			// notify.send(...)
		}
	}, _SECONDS);
};

module.exports = {
	countConnection,
	checkOverload,
};
