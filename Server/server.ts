import express, { Express } from 'express'
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'

// App Configuration
dotenv.config()
const app: Express = express()

// Server Configuration
const server = require('http').createServer(app)
const io: Server = new Server(server)

// Routes
app.get('/', (req, res) => {
  res.send('This is MERN RealTime Board Sharing App')
})

// Socket IO
io.on('connection', socket => {
  console.log('User Connected')
})

// Starting the Server
const port = process.env.PORT
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${5000}`)
})
