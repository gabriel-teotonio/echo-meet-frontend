import { Route, Routes } from 'react-router-dom'
import { PrivateLayout } from './Layouts/PrivateLayout'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import './App.css'
import { Users } from './pages/Users/Users'
import { Summary } from './pages/Summary/Summary'
import { Reunioes } from './pages/Reunioes/Reunioes'

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateLayout />}>
          <Route index element={<Home />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/summary' element={<Summary />}/>
          <Route path='/reunioes' element={<Reunioes />} />
        </Route>
      <Route index path='/login' element={<Login />}/>
      <Route index path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
