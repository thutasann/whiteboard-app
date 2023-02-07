const express = require('express')
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'
import { RoomTypes } from './types/roomData'
import { addUser } from './utils/user'

// App Configuration
dotenv.config()
const app = express()

// Server Configuration
const server = require('http').createServer(app)
const io: Server = new Server(server)

// API Routes
app.get('/', (req, res) => {
  res.send('This is MERN RealTime Board Sharing App')
})

let roomIdGlobal, imageURLGlobal

// Socket IO
io.on('connection', socket => {
  socket.on('userJoined', (data: RoomTypes) => {
    const { name, userId, roomId, host, presenter } = data
    roomIdGlobal = roomId
    socket.join(roomId)
    const users = addUser(data)
    socket.emit('userIsJoined', { success: true, users })
    socket.broadcast.to(roomId).emit('whiteboardDataResponse', {
      imgURL: imageURLGlobal,
    })
  })

  socket.on('whiteboardData', data => {
    imageURLGlobal = data
    socket.broadcast.to(roomIdGlobal).emit('whiteboardDataResponse', {
      imgURL: data,
    })
  })
})

// Starting the Server
const port = process.env.PORT
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${5000}`)
})
