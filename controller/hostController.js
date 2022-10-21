const uuid = require('uniqid')
const { createRoom,findRoom,findRoomByRoomIdAndPassword } = require('../model/hostModel')
const { generateString } = require('../utils/utils')
const { getDifficulty, getCategories } = require('../service/triviaDb')
const { joinPlayer } = require('../model/playerModel')
module.exports = {
    createRoom: async (payload) => {
        const room = {
            roomId: uuid.process().toUpperCase(),
            password: generateString(7),
            joinPassword: generateString(7),
            name: payload.data.name,
            timeout: payload.data.timeout
        }
        try {
            const createdRoom = await createRoom(room)
            const categories = await getCategories()
            let difficulty = getDifficulty()
            return {
                room: createdRoom,
                triviaParameters: {
                    maxNumberOfQuestions: 50,
                    categories,
                    difficulty
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    findRoomByRoomId:async (roomId) => {
        try {
            const room=await findRoom(roomId)
            return room
        } catch (err) {
            console.log(err);
        }
    },
    checkRoomIdAndPassword:async(payload)=>{
        try {
            let roomId=payload.data.roomId
            let password=payload.data.password
            const room=await findRoomByRoomIdAndPassword(roomId,password)
            return room
        } catch (err) {
            console.log(err);
        }
    },
    playerCount:async(roomId)=>{
        try {
            const vacancy=await playerCountInRoom(roomId)
            return vacancy
        } catch (err) {
            console.log(err);
        }
    },
    joinPlayer:async(payload,roomId)=>{
        const player = {
            roomId:roomId,
            playerId:uuid.process().toUpperCase(),
            name:payload.data.name
        }
        try {
            const result=await joinPlayer(player)
            return result
        } catch (err) {
            console.log(err);
        }
    }
}