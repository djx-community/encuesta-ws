const { findRoomByRoomId } = require("../controller/hostController")

module.exports = (io, socket) => {
    socket.on("player:join", async (payload) => {
        const room = await findRoomByRoomId(payload.data.roomId)
        if (!room) {
            console.log("roomId is invalid");
        }else{
            console.log(room);
        }
    })
}