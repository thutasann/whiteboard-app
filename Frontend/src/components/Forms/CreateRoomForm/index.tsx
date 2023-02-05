import React from 'react'

const CreateRoomForm = () => {
  return (
    <form className='form'>
      <input className='input' placeholder='Name' />
      <div className='inputGroup'>
        <input className='input' readOnly />
        <button className='btnGenerate'>Generate</button>
        <button className='btnCopy'>Copy</button>
      </div>
      <button className='actionBtns'>Create Room</button>
    </form>
  )
}

export default CreateRoomForm
