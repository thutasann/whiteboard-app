import Forms from './components/Forms'
import { Link, Route, Routes } from 'react-router-dom'
import RoomPage from './pages/Room'
import NotFound from './pages/NotFound'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { RoomTypes } from './types/roomData'
import { toast, ToastContainer } from 'react-toastify'

const server = 'http://localhost:5000'
const connectionOptions = {
  'force new connection': true,
  reconnectionAttempt: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
}

const socket = io(server, connectionOptions)

function App() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState<RoomTypes[]>([])

  useEffect(() => {
    socket.on('userIsJoined', data => {
      console.log('data', data)
      if (data.success) {
        console.log('userJoined')
        setUsers(data?.users)
      } else {
        console.log('userJoined error')
      }
    })

    socket.on('allUsers', data => {
      setUsers(data)
    })

    socket.on('userJoinedMessageBoradcasted', data => {
      console.log('message', data)
      toast.info(`${data} joined the room`)
    })

    socket.on('userLeftMessageBroadcasted', data => {
      toast.warning(`${data} left the room`)
    })
  }, [])

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
  }

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col items-center mt-4'>
        <Link to='/'>
          <img src='/logo.png' width={70} height={70} alt='Whiteboard App' />
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path='/:roomId' element={<RoomPage user={user} socket={socket} users={users} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
