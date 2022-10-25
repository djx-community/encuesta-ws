const { Schema } = require('mongoose')
const { collections } = require('../config/constant')

module.exports = {
    roomSchema: new Schema({
        name: {
            type: String,
            required: true
        },
        roomId: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        joinPassword: {
            type: String,
            required: true
        },
        timeout: {
            type: Number,
            required: true
        },
    }),
    roomQuestionSchema: new Schema({
        roomId: {
            type: Schema.Types.ObjectId,
            ref: collections.Room,
            required: true
        },
        question: {
            type: String,
            required: true,
        },
        correct_answer: {
            type: String,
            required: true,
        },
        incorrect_answers: {
            type: [String],
            required: true,
        }
    }),
    playerSchema: new Schema({
        roomId: {
            type: Schema.Types.ObjectId,
            ref: collections.Room,
            required: true
        },
        playerId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        socketId: {
            type: String,
            required: true,
        }
    })
}