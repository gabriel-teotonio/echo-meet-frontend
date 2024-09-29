import { Route, Routes } from 'react-router-dom'
import { PrivateLayout } from './Layouts/PrivateLayout'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import './App.css'

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateLayout />}>
          <Route index element={<Home />}/>
        </Route>
      <Route index path='/login' element={<Login />}/>
      <Route index path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
