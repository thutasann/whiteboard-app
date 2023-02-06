import { useState } from 'react'
import { RoomTypes } from '../../../types/roomData'

type RoomProps = {
  uuid: any
}

const CreateRoomForm = ({ uuid }: RoomProps) => {
  const [roomId, setRoomId] = useState(uuid())
  const [name, setName] = useState<string>('')

  const handleCreateRoom = e => {
    e.preventDefault()
    const roomData: RoomTypes = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    }
    console.log('roomData', roomData)
  }

  return (
    <form className='form' onSubmit={handleCreateRoom}>
      <input className='input' placeholder='Enter Room Name' value={name} onChange={e => setName(e.target.value)} />
      <div className='inputGroup'>
        <input className='input' value={roomId} readOnly />
        <button
          className='btnGenerate'
          type='button'
          onClick={e => {
            e.preventDefault()
            setRoomId(uuid())
          }}
        >
          Generate
        </button>
        <button className='btnCopy' type='button'>
          Copy
        </button>
      </div>
      <button type='submit' onClick={handleCreateRoom} className='actionBtns'>
        Create Room
      </button>
    </form>
  )
}

export default CreateRoomForm
