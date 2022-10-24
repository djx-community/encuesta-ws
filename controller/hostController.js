const uuid = require('uniqid')
const roomModel = require('../model/roomModel')
const utils = require('../utils/utils')
const triviaDb = require('../service/triviaDb')
module.exports = {
    createRoom: (payload) => {
        return new Promise(async (resolve, reject) => {
            const room = {
                roomId: uuid.process().toUpperCase(),
                password: utils.generateString(7),
                joinPassword: utils.generateString(7),
                name: payload.room.name,
                timeout: payload.room.timeout
            }
            try {
                const createdRoom = await roomModel.createRoom(room)
                const categories = await triviaDb.getCategories()
                let difficulty = triviaDb.getDifficulty()
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
        },

        )
    },
    authRoom: (roomId, password) => {
        return new Promise(async (resolve, reject) => {
            const room = await roomModel.findRoomById(roomId)
            if (!room) reject("Room not Found")
            else if (room.password === password) resolve(room);
            else reject('unauthorized');
        })
    },
    addQuestionsToDb: (roomId, quizSet) => {
        return new Promise(async (resolve, reject) => {
            try {
                const questionSet = await quizSet.map(question => {
                    return {
                        roomId,
                        question: question.question,
                        correct_answer: question.correct_answer,
                        incorrect_answer: question.incorrect_answers
                    }
                })
                const questionsStatus = await roomModel.addQuestions(questionSet)
                resolve(questionsStatus)
            }
            catch (e) {
                reject(e)
            }
        })
    },
}