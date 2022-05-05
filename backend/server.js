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
        x: Math.random()*100,
        y: Math.random()*100
    }

    socket.emit("players-data",players);

    socket.broadcast.emit("new-player", players[socket.id]);
});