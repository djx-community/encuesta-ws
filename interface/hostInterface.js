const { createRoom } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("room:create", (payload) => createRoom(io, socket, payload))
}