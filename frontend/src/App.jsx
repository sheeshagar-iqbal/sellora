import React from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
  <Header/>
  <Routes>
<Route index element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>

  </Routes>
    </div>
  )
}

export default App