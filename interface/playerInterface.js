const { findRoomByRoomId, checkRoomIdAndPassword, joinPlayer, playerCount } = require("../controller/hostController")

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
                let roomId=room._id
                let vacancy=await playerCount(roomId)
                if (vacancy>100) {
                    socket.emit('Player', {
                        action: "join",
                        status: "failed",
                        message: "room is full"
                    });
                }else{
                    const Player = await joinPlayer(payload,roomId)
                    socket.emit('Player', {
                        action: "join",
                        status: "success",
                        ...Player
                    });
                }
            }
        }
    })
}