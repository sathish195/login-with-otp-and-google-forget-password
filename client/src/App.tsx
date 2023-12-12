import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '../../client/src/components/signUp'
import Todo from './components/todoLIst/index'
import ForgotPassword from './components/login/forgotpassword'
import ChangePassword from './components/login/changepassword'
import Post from './components/Post/post'
import SendOtp from './components/Otp/sendOtp'
import Verifyotp from './components/Otp/otpVerify'

import './App.css'
import Login from './components/login'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path='/signup'  element={<SignUp/>} />
    <Route path='/login'  element={<Login/>} />
    <Route path='/'  element={<Todo/>} />
    <Route path='/forgotpassword' element={<ForgotPassword/>} />
    <Route path='/changepassword/:id' element={<ChangePassword/>} />
    <Route path='/postdata' element={<Post/>} />
    <Route path='/otp' element={<SendOtp/>} />
    <Route path='/verifyotp' element={<Verifyotp/>} />









    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App