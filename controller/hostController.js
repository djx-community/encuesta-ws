const uuid = require('uniqid')
const { createRoom } = require('../model/hostModel')
const { generateString } = require('../utils/utils')
const { getQuestions, getPossibleCategories } = require('../service/triviaDb')
module.exports = {
    createRoom: async (io, socket, payload) => {
        const room = {
            roomId: uuid.process(),
            password: generateString(7),
            name: payload.data.name,
            timeout: payload.data.timeout
        }
        try {
            const possibleCategories = await getPossibleCategories()
            let difficulty = ["easy", "medium", "hard"]
            const createdRoom = await createRoom(room)
            socket.emit('room', {
                action: "create",
                status: "success",
                room: createdRoom,
                PossibleParameters: {
                    NumberOfQuestions: 50,
                    Categories: possibleCategories,
                    difficulty
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}