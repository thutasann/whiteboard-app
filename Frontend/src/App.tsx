import Forms from './components/Forms'
import { Link, Route, Routes } from 'react-router-dom'
import RoomPage from './pages/Room'
import NotFound from './pages/NotFound'

function App() {
  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
  }

  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <Link to='/'>
          <img src='/logo.png' width={70} height={70} alt='Whiteboard App' />
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<Forms uuid={uuid} />} />
        <Route path='/:roomId' element={<RoomPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
