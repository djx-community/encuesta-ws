const { createRoom } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        try {
            const room = await createRoom(payload)
            socket.join(room._id);
            socket.join(room._id + "_host");
            socket.emit('room', {
                action: "room:create",
                status: "success",
                ...room
            });
        } catch (e) {
            socket.emit('room', {
                action: "room:create",
                status: "success",
                message: "Something went wrong"
            });
        }
    })
}