const { Player } = require("../config/connection")

module.exports = {
    createPlayer: (player) => Player.create(player),
}