const playerController = require('../controller/playerController')

module.exports = (io, socket) => {
    socket.on("player:join", async (payload) => {
        try {
            const room = await playerController.authRoom(payload.room.roomId)
            const player = await playerController.joinPlayerToRoom({ ...payload.player, socketId: socket.id }, room)
            socket.join(room._id)
            socket.join(room._id + "_player")
            if (room.hasOwnProperty("password"))
                delete room.password
            socket.emit('player', {
                action: "player:join",
                status: "success",
                player,
                room
            });
        } catch (e) {
            socket.emit('player', {
                action: "player:join",
                status: "error",
                message: e
            });
        }
    })
}