const uuid = require('uniqid')
const { createRoom } = require('../model/hostModel')
const { generateString } = require('../utils/utils')

module.exports = {
    createRoom: async (payload) => {
        const room = {
            roomId: uuid.process(),
            password: generateString(7),
            name: payload.data.name,
            timeout: payload.data.timeout
        }
        try {
            return await createRoom(room)
        } catch (err) {
            console.log(err);
        }
    }
}