import React from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Themes from './utils/Themes'
import ProductInsert from './components/Product.Ads'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import Prorouter from './utils/Prorouter'




const App = () => {
  return (
    <div>
      <Themes/>
  <Header/>
  <Routes>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/productinsert' element={<ProductInsert/>}/>
<Route path='/product/:id' element={<ProductDetails/>}/>
<Route path='/profile' element={<Profile/>}/>


<Route index element={<Prorouter><Home/></Prorouter>}/>


  </Routes>
    </div>
  )
}

export default App