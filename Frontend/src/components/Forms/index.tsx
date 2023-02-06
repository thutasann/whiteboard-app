import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'

type FormProps = {
  uuid: any
  socket: any
  setUser: any
}

const Forms = ({ uuid, socket, setUser }: FormProps) => {
  return (
    <div className='formsWrapper'>
      <h1>Welcome to Whiteboard Sharing App</h1>
      <div className='cardWrapper'>
        <div className='card'>
          <h2>Create Room</h2>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
        <div className='card'>
          <h2>Join Room</h2>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
    </div>
  )
}

export default Forms
