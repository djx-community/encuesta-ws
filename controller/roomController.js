const { RoomQuestions } = require("../config/connection")
const roomModel = require("../model/roomModel")

module.exports = {
    getRoom: (roomId) => roomModel.findRoomByRoomId(roomId),
    getRoomId: (roomId) => Room.findById(roomId),
    addQuestions: (questionSet) => RoomQuestions.insertMany(questionSet)
}