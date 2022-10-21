const { findRoomByRoomId, checkRoomIdAndPassword, joinPlayer } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("player:join", async (payload) => {
        const roomExisted = await findRoomByRoomId(payload.data.roomId)
        if (!roomExisted) {
            socket.emit('Player', {
                action: "join",
                status: "failed",
                message: "room not existed"
            });
        } else {
            const room = await checkRoomIdAndPassword(payload)
            if (!room) {
                socket.emit('Player', {
                    action: "join",
                    status: "failed",
                    message: "password is incorrect"
                });
            }
            else {
                // const playerCount=await playerCount(payload.data.roomId)
                console.log(room._id);
                let roomId=room._id
                const Player = await joinPlayer(payload,roomId)
                socket.emit('Player', {
                    action: "join",
                    status: "success",
                    ...Player
                });
            }
        }
    })
}