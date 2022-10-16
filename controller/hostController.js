const uuid = require('uniqid')
const { createRoom } = require('../model/hostModel')
const { generateString } = require('../utils/utils')

module.exports = {
    createRoom: async (io, socket, payload) => {
        const room = {
            roomId: uuid.process(),
            password: generateString(7),
            name: payload.data.name,
            timeout: payload.data.timeout
        }
        try {
            const createdRoom = await createRoom(room)
            socket.emit('room', {
                action: "create",
                status: "success",
                room: createdRoom
            });
        } catch (err) {
            console.log(err);
        }

    }
}