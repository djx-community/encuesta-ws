const { createRoom } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        const room = await createRoom(payload)
        socket.join(room.roomId);
        socket.join(room.roomId + "_host");
        socket.emit('room', {
            action: "create",
            status: "success",
            ...room
        });
    })
}