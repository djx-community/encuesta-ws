const { Room,Player } = require("../config/connection")

module.exports = {
    createRoom: (room) => Room.create(room),
    findRoom:(roomId) => Room.findOne({roomId:roomId}) ,
    findRoomByRoomIdAndPassword:(roomId,password)=>Room.findOne({roomId:roomId,password:password}), 
    playerCountInRoom:(roomId)=>Player.countDocuments({roomId:roomId})
}