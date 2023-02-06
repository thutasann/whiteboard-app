import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'

type FormProps = {
  uuid: any
}

const Forms = ({ uuid }: FormProps) => {
  return (
    <div className='formsWrapper'>
      <h1>Welcome to Whiteboard Sharing App</h1>
      <div className='cardWrapper'>
        <div className='card'>
          <h2>Create Room</h2>
          <CreateRoomForm uuid={uuid} />
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
