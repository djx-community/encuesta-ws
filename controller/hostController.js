const uuid = require('uniqid')
const { createRoom } = require('../model/hostModel')
const { generateString } = require('../utils/utils')
const { getDifficulty, getCategories } = require('../service/triviaDb')
module.exports = {
    createRoom: async (payload) => {
        const room = {
            roomId: uuid.process(),
            password: generateString(7),
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
    }
}