import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorRegister from './pages/DoctorRegister'
import EmailVerification from './pages/EmailVerification'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/doctor-register' element={<DoctorRegister/>} />
        <Route path='/verify' element={<EmailVerification/>}/>
      </Routes>
    </>
  )
}

export default App
