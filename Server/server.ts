const express = require('express')
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'
import { RoomTypes } from './types/roomData'

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

// Socket IO
io.on('connection', socket => {
  socket.on('userJoined', (data: RoomTypes) => {
    const { name, userId, roomId, host, presenter } = data
    socket.join(roomId)
    socket.emit('userIsJoined', { success: true })
  })
})

// Starting the Server
const port = process.env.PORT
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${5000}`)
})
