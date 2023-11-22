const app = require('./src/app');
const createSocket = require('./src/socket/socket.js');

const {
	app: { port },
} = require('./src/configs/config.mongodb');

const server = app.listen(port, () => {
	console.log(`Welcome to Quan ly Tiem Chung with port ${port}`);
});

createSocket(server);

