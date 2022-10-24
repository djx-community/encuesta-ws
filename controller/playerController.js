const playerModel = require("../model/playerModel");
const roomModel = require("../model/roomModel");
const uuid = require('uniqid')

module.exports = {
    joinPlayerToRoom: async (player, room) => {
        return new Promise(async (resolve, reject) => {
            if (await roomModel.playerCount({ _id: room._id }) >= 100)
                reject("Room is Full")
            else {
                const newPlayer = {
                    roomId: room._id,
                    playerId: uuid.process().toUpperCase(),
                    name: player.name,
                    socketId: player.socketId
                }
                resolve(await playerModel.createPlayer(newPlayer))
            }
        })
    },
    authRoom: (roomId, password) => {
        return new Promise(async (resolve, reject) => {
            const room = await roomModel.findRoomByRoomId(roomId)
            if (!room) reject("Room not Found")
            else if (room.joinPassword === password) resolve(room);
            else reject('unauthorized');
        })
    }
}