const { Schema } = require('mongoose')

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
        timeout: {
            type: Number,
            required: true
        },
    })
}