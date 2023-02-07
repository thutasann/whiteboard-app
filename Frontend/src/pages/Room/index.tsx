import { useRef, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import Modal from '../../components/Modal'
import WhiteBoard from '../../components/Whiteboard'

type RoomPageProps = {
  user: any
  users: any[]
  socket: Socket
}

const RoomPage = ({ user, users, socket }: RoomPageProps) => {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  const [tool, setTool] = useState('pencil')
  const [color, setColor] = useState('black')
  const [elements, setElements] = useState([])
  const [history, setHistory] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      socket.emit('userLeft', user)
    }
  })

  const OpenModal = () => {
    setIsOpen(true)
  }

  console.log('users =>', users)

  const handleClearCanvas = () => {
    const canvas = canvasRef.current
    // @ts-ignore
    const ctx = canvas.getContext('2d')
    ctx.fillRect = 'white'
    // @ts-ignore
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setElements([])
  }

  const undo = () => {
    setHistory(prevHistory => [...prevHistory, elements[elements.length - 1]])
    setElements(prevElements => prevElements.slice(0, prevElements.length - 1))
  }

  const redo = () => {
    setElements(prevElements => [...prevElements, history[history.length - 1]])
    setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1))
  }

  return (
    <div className='mainWrapper'>
      <h1>
        Whiteboard <span className='text-teal-700'>[Users Online : {users?.length || 0}]</span>
      </h1>
      <button className='joinersBtn' onClick={OpenModal}>
        See Joiners
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} users={users} user={user} />
      {user?.presenter && (
        <div className='toolBtnsContainer mt-5'>
          <div className='colorPicker'>
            <div>
              <label htmlFor='color'>Select Color: </label>
              <input type='color' id='color' className='colorPicketInput' value={color} onChange={e => setColor(e.target.value)} />
            </div>
          </div>
          <div className='tools'>
            <div>
              <label htmlFor='pencil'>Pencil</label>
              <input
                type='radio'
                name='tool'
                checked={tool === 'pencil'}
                className='radio'
                value='pencil'
                id='pencil'
                onChange={e => setTool(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='line'>Line</label>
              <input
                type='radio'
                name='tool'
                checked={tool === 'line'}
                className='radio'
                value='line'
                id='line'
                onChange={e => setTool(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='rectangle'>Rectangle</label>
              <input
                type='radio'
                name='tool'
                checked={tool === 'rectangle'}
                className='radio'
                value='rectangle'
                onChange={e => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className='rewindBtnWrapper'>
            <button
              className='rewindBtns bg-[#007bff] text-white hover:bg-opacity-90'
              disabled={elements.length === 0}
              onClick={() => undo()}
            >
              Undo
            </button>
            <button className='rewindBtns' disabled={history.length < 1} onClick={() => redo()}>
              Redo
            </button>
          </div>
          <div className='clear'>
            <button className='rewindBtns clearBtn' onClick={handleClearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>
      )}
      <div className='whiteboardContainer mb-7'>
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default RoomPage
