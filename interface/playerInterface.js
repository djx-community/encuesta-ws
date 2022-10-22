const playerController = require('../controller/playerController')
const roomController = require('../controller/roomController')

module.exports = (io, socket) => {
    socket.on("player:join", async (payload) => {
        try {
            const player = await playerController.joinPlayerToRoom({ ...payload.player, socketId: socket.id }, payload.room)
            const room = await roomController.getRoom(payload.room.roomId)
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