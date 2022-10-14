const socketIo = require('socket.io')
const dotenv = require('dotenv').config()
const http = require('http')

const server = http.createServer()

//interfaces
const quickPlayInterface = require('./interface/quickPlayInterface')
const hostInterface = require('./interface/hostInterface')

const io = new socketIo.Server(server, {
    cors: { origin: "*" }
})

const onConnection = (socket) => {
    quickPlayInterface(io, socket)
    hostInterface(io, socket)
}

io.on('connection', onConnection)