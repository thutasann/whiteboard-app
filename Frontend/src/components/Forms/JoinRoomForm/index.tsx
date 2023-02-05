import React from 'react'

const JoinRoomForm = () => {
  return (
    <form className='form'>
      <input className='input' placeholder='Name' />
      <input className='input mt-5' placeholder='Room ID' />
      <button className='actionBtns'>Join Room</button>
    </form>
  )
}

export default JoinRoomForm
