const uuid = require('uniqid')
const { createRoom, getRoomById, addQuestions } = require('../model/hostModel')
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
    authRoom: async (roomId, password) => {
        const room = await getRoomById(roomId)
        if (room.password === password) return true;
        else return false;
    },
    addQuestionsToDb: (roomId, quizSet) => {
        return new Promise(async (resolve, reject) => {
            const questionSet = await quizSet.map(question => {
                return {
                    roomId,
                    question: question.question,
                    correct_answer: question.correct_answer,
                    incorrect_answers: question.incorrect_answers
                }
            })
            try {
                const questionsStatus = await addQuestions(questionSet)
                resolve(questionsStatus)
            } catch (e) {
                reject(e)
            }
        })
    }
}