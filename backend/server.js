const { Server } = require("socket.io");

var players = {}

const io = new Server(8080, {
    cors: {
        origin:["http://localhost:3000"]
    }
})

io.on('connection', (socket) => {
    console.log("New Player Id: ",socket.id);

    players[socket.id] = {
        id: socket.id,
        x: 100,
        y: 100
    }

    socket.emit("players data",players);
});