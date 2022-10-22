const uuid = require('uniqid')
const { createRoom, findRoom } = require('../model/roomModel')
const { generateString } = require('../utils/utils')
const { getDifficulty, getCategories } = require('../service/triviaDb')
module.exports = {
    createRoom: (payload) => {
        return new Promise(async (resolve, reject) => {
            const room = {
                roomId: uuid.process().toUpperCase(),
                password: generateString(7),
                joinPassword: generateString(7),
                name: payload.room.name,
                timeout: payload.room.timeout
            }
            try {
                const createdRoom = await createRoom(room)
                const categories = await getCategories()
                let difficulty = getDifficulty()
                resolve({
                    room: createdRoom,
                    triviaParameters: {
                        maxNumberOfQuestions: 50,
                        categories,
                        difficulty
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    },
    isRoomExist: async (condition) => {
        try {
            const room = await findRoom(condition)
            if (room) return room
            else return false
        } catch (err) {
            return false
        }
    },
}