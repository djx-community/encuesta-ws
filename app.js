const socketIo = require('socket.io')
require('dotenv').config()
const http = require('http')
// const fetch = require("node-fetch");

const db = require('./config/connection')

const server = http.createServer()

//interfaces
const quickPlayInterface = require('./interface/quickPlayInterface')
const hostInterface = require('./interface/hostInterface')
const playerInterface = require('./interface/playerInterface')

const io = new socketIo.Server(server, {
    cors: { origin: "*" }
})

db.connect(() => {
    console.log("db connected successfully")
})

io.on('connection', (socket) => {
    hostInterface(io, socket)
    quickPlayInterface(io, socket)
    playerInterface(io,socket)
})




server.listen('3000', () => {
    console.log("Listening on port 3000");
})