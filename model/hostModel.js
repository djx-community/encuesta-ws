const { Room, RoomQuestions } = require("../config/connection")

module.exports = {
    createRoom: (room) => Room.create(room),
    getRoomById: (roomId) => Room.findById(roomId),
    addQuestions: (questionSet) => RoomQuestions.insertMany(questionSet)
}