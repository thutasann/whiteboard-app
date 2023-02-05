import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'

const Forms = () => {
  return (
    <div className='formsWrapper'>
      <h1>Welcome to RealTime Whiteboard Sharing App</h1>
      <div className='cardWrapper'>
        <div className='card'>
          <h2>Create Room</h2>
          <CreateRoomForm />
        </div>
        <div className='card'>
          <h2>Join Room</h2>
          <JoinRoomForm />
        </div>
      </div>
    </div>
  )
}

export default Forms
