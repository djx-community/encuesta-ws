const roomModel = require("../model/roomModel")

module.exports = {
    getRoom: (roomId) => roomModel.findRoomByRoomId(roomId)
}