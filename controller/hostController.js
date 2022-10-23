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
        },
        
        )
    },
    authRoom: async (roomId,password)=>{
        const room = await getRoomById(roomId)
        if(room.password === password) return true;
        else return false;
    },
    addQuestionstoDb: (roomId,quizSet) => {
        return new Promise(async (resolve,reject)=>{
            const questionSet = await quizSet.map(question => {
                return{
                    roomId,
                    question: question.question,
                    correct_answer: question.correct_answer,
                    incorrect_answer: question.incorrect_answers
                }
            })
            try {
                const questionsStatus = await addQuestions(questionSet)
                resolve(questionsStatus)

            } 
            catch(e) {
                reject(e)
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