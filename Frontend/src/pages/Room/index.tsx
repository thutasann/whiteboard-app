import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import WhiteBoard from '../../components/Whiteboard'

const RoomPage = () => {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const { roomId } = useParams()
  console.log('param', roomId)

  const [tool, setTool] = useState('pencil')
  const [color, setColor] = useState('black')
  const [elements, setElements] = useState([])

  const handleClearCanvas = () => {
    const canvas = canvasRef.current
    // @ts-ignore
    const ctx = canvas.getContext('2d')
    ctx.fillRect = 'white'
    // @ts-ignore
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setElements([])
  }

  return (
    <div className='mainWrapper'>
      <h1>
        Whiteboard <span className='text-teal-700'>[Users Online : 0]</span>
      </h1>
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
          <button className='rewindBtns bg-[#007bff] text-white hover:bg-opacity-90'>Undo</button>
          <button className='rewindBtns'>Redo</button>
        </div>
        <div className='clear'>
          <button className='rewindBtns clearBtn' onClick={handleClearCanvas}>
            Clear Canvas
          </button>
        </div>
      </div>
      <div className='whiteboardContainer mb-7'>
        <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color} />
      </div>
    </div>
  )
}

export default RoomPage
