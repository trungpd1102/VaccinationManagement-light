import { io } from 'socket.io-client';

// Variables for socket.io-client
const socketClient = {};

// Set socket connection
socketClient.setup = function () {
	const baseURL = process.env.VUE_APP_BASE_URL;
	console.log({ baseURL: baseURL });
	socketClient.io = io(baseURL, {
		closeOnBeforeunload: false, //Prevent close when there is `beforeunload` event
	});

	console.log({ io: socketClient.io });
};

// Register a new handler for the given event
socketClient.listen = function (event, callback) {
	console.log({ socketReceiveEvent: event });
	socketClient.io.on(event, callback);
};

// Register sender for the given event
socketClient.send = function (event, data) {
	console.log({ socketSendEvent: event, data });
	socketClient.io.emit(event, data);
};

// Removes the previously registered listener for the given event
socketClient.removeListener = function (event, callback) {
	socketClient.io.off(event, callback);
};

// Removes the all registered listeners for the given event
socketClient.removeAllListeners = function (event) {
	console.log({ socketRemoveListenerEvent: event });
	
	socketClient.io.removeAllListeners(event);
};

export default socketClient;
