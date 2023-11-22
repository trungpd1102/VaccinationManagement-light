const { Server } = require('socket.io');

module.exports = function createSocket(server) {
	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		let currentRoom;

		console.log('client Id', socket.client.id);
		console.log('number of client', socket.server.eio.clientsCount);
		// console.log('client connected');
		// socket.emit('connected');

		socket.on('disconnect', () => {
			console.log('client disconnected');
			console.log('client Id', socket.client.id);
			console.log('number of client', socket.server.eio.clientsCount);
		});

		socket.on('join', (room) => {
			console.log('joining room', room);
			socket.join(room);
			currentRoom = room;
			socket.emit('joined', room);
		});

		socket.on('data-send', ({ room, data }) => {
			console.log('data received:::', data);
			socket.to(room).emit('data-receive', data);
		});
	});
};
