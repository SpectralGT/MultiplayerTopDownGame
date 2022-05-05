const { Server } = require("socket.io");

var players = {};

const io = new Server(8080, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

io.on("connection", (socket) => {
	console.log("New Player Id: ", socket.id);

	players[socket.id] = {
		id: socket.id,
		x: Math.random() * 100,
		y: Math.random() * 100,
	};

	socket.emit("enemies-data", players);

	socket.broadcast.emit("new-enemy", players[socket.id]);

    socket.on('player-moved', (newX, newY) => {
        players[socket.id].x = newX;
        players[socket.id].y = newY;

        socket.broadcast.emit('enemy-moved', players[socket.id]);
    })

    socket.on('coin-collected', (newX, newY) => {
        socket.broadcast.emit('coin-collected', newX, newY);
    })

	socket.on("disconnect", (reason) => {
		delete players[socket.id];
		socket.broadcast.emit("enemy-disconnected", socket.id);
	});
});
