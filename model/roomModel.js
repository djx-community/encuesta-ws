const { Room, Player } = require("../config/connection")

module.exports = {
    createRoom: (room) => Room.create(room),
    findRoomByRoomId: (roomId) => Room.findOne({ roomId }),
    playerCount: (condition) => Player.countDocuments(condition),
    findRoomById: (id) => Room.findById(id),
    findRoom: (condition) => Room.findOne(condition)
}