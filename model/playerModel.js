const { Player } = require("../config/connection")

module.exports = {
    joinPlayer:(player)=>Player.create(player)
}