import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '../../client/src/components/signUp'
import Todo from './components/todoLIst/index'

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



    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App


// import './App.css'
// import Signup from "../src/Components/Signup"
// import Login from './Components/Login'
// import Conter from './Components/Conter'
// import Admin from './Components/Admin/index'
// import Parent from './Components/parent/index'
// import Logo from './Components/drag'

// function App() {


//   return (
//   <BrowserRouter>
//     <Routes>
//       <Route path='/'  element={<Signup/>} />
//       <Route path='/login' element={<Login/>} />
//       <Route path='/conter' element={<Conter/>} />
//       <Route path='/admin' element={<Admin/>} />
//       <Route path='/use' element={<Admin/>} />
//       <Route path='/Parent' element={<Parent/>} />
//       <Route path='/drag' element={<Logo/>} />






    
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App