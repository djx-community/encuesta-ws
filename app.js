const socketIo = require('socket.io')
require('dotenv').config()
const http = require('http')

const server = http.createServer()

//interfaces
const quickPlayInterface = require('./interface/quickPlayInterface')
const hostInterface = require('./interface/hostInterface')
const db = require('./config/connection')

const io = new socketIo.Server(server, {
    cors: { origin: "*" }
})

db.connect(() => {
    console.log("db connected successfully")
})

io.on('connection', (socket) => {
    hostInterface(io, socket)
    quickPlayInterface(io, socket)
})


server.listen('3000', () => {
    console.log("Listening on port 3000");
})