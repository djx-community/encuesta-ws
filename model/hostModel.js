const { Room } = require("../config/connection")

module.exports = {
    createRoom: (room) => Room.create(room)
}