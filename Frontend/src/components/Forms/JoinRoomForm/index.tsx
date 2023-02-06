import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { RoomTypes } from '../../../types/roomData'
import { useNavigate } from 'react-router-dom'

type RoomProps = {
  uuid: any
  socket: Socket
  setUser: any
}

const JoinRoomForm = ({ uuid, socket, setUser }: RoomProps) => {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleRoomJoin = e => {
    e.preventDefault()
    const roomData: RoomTypes = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    }
    setUser(roomData)
    navigate(`/${roomId}`)
    socket.emit('userJoined', roomData)
  }

  return (
    <form className='form'>
      <input className='input' placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)} />
      <input className='input mt-5' placeholder='Eneter Room ID' value={roomId} onChange={e => setRoomId(e.target.value)} />
      <button className='actionBtns' onClick={handleRoomJoin}>
        Join Room
      </button>
    </form>
  )
}

export default JoinRoomForm
