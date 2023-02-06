import { useState } from 'react'
import { RoomTypes } from '../../../types/roomData'
import { Socket } from 'socket.io-client'

type RoomProps = {
  uuid: any
  socket: Socket
  setUser: any
}

const CreateRoomForm = ({ uuid, socket, setUser }: RoomProps) => {
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
    setUser(roomData)
    socket.emit('userJoined', roomData)
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
