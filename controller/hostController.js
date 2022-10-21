const uuid = require('uniqid')
const { createRoom,findRoom } = require('../model/hostModel')
const { generateString } = require('../utils/utils')
const { getDifficulty, getCategories } = require('../service/triviaDb')
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
    }
}