const { createRoom } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        const room = await createRoom(payload)
        socket.emit('room', {
            action: "create",
            status: "success",
            ...room
        });
    })
}