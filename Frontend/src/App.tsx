import Forms from './components/Forms'
import { Link, Route, Routes } from 'react-router-dom'
import RoomPage from './pages/Room'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <Link to='/'>
          <img src='/logo.png' width={70} height={70} alt='Whiteboard App' />
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<Forms />} />
        <Route path='/:roomId' element={<RoomPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
