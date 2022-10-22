const playerModel = require("../model/playerModel");
const roomModel = require("../model/roomModel");
const hostController = require("./hostController");
const uuid = require('uniqid')

module.exports = {
    joinPlayerToRoom: async (player, room) => {
        return new Promise(async (resolve, reject) => {
            const isRoomExist = await hostController.isRoomExist({ roomId: room.roomId })
            if (!isRoomExist)
                reject("Room not Found")
            else if (isRoomExist.joinPassword !== room.password)
                reject("Password Incorrect")
            else if (await roomModel.playerCount({ roomId: room.roomId }) >= 100)
                reject("Room is Full")
            else {
                const newPlayer = {
                    roomId: isRoomExist._id,
                    playerId: uuid.process().toUpperCase(),
                    name: player.name,
                    socketId: player.socketId
                }
                resolve(await playerModel.createPlayer(newPlayer))
            }
        })
    },
    playerCount: async (roomId) => {
        try {
            const vacancy = await playerCountInRoom(roomId)
            return vacancy
        } catch (err) {
            return false
        }
    }
}