// import React from 'react'
// import Home from './pages/Home'
// import Header from './components/Header'
// import { Route, Routes } from 'react-router-dom'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import Themes from './utils/Themes'
// import ProductInsert from './components/Product.Ads'
// import ProductDetails from './pages/ProductDetails'
// import Profile from './pages/Profile'
// import Prorouter from './utils/Prorouter'
// import ProductUpdate from './components/Prpduct.Ads.Put'
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Wishlist from './pages/Wishlist'
// import AddToCart from './pages/AddToCard'
// import EditProfile from './pages/EditProfile'
// import Adminrouter from './utils/Adminrouter'
// import Admindashboard from './pages/Admindashboard'
// import Footer from './components/Footer'
// import { useContext } from 'react'
// import { UserContext } from './context/UserContext'
// import { useEffect } from 'react'



// const App = () => {
//   const {user}= useContext(UserContext)
//   // console.log(user);

//   return (
//     <div>
//       {/* <Themes/> */}
//    {/* {  (user.role==="user")? */}
//              <Header/>
//       {/* } */}
//   <Routes>
// <Route path='/' element={<Home/>}/>

// <Route path='/signup' element={<Signup/>}/>
// <Route path='/login' element={<Login/>}/>
// <Route path='/productinsert' element={<Prorouter><ProductInsert/></Prorouter>}/>
// <Route path='/productupdate/:id' element={<Prorouter><ProductUpdate/></Prorouter>}/>
// <Route path='/product/:id' element={<ProductDetails/>}/>
// <Route path='/userprofile' element={<Prorouter><Profile/></Prorouter>}/>
// <Route path='/wishlist' element={<Prorouter><Wishlist/></Prorouter>}/>
// <Route path='/cart' element={<Prorouter><AddToCart/></Prorouter>}/>
// <Route path='/edit-profile' element={<Prorouter><EditProfile/></Prorouter>}/>


// <Route path="/admin" element={<Adminrouter><Admindashboard></Admindashboard></Adminrouter> }
// />


//   </Routes>
// {/* <Footer/> */}

//   <ToastContainer
//         position="top-right"
//         autoClose={2000}
//       />
//     </div>
//   )
// }

// export default App



import React, { useContext } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductInsert from "./components/Product.Ads";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Prorouter from "./utils/Prorouter";
import ProductUpdate from "./components/Prpduct.Ads.Put";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "./pages/Wishlist";
import AddToCart from "./pages/AddToCard";
import EditProfile from "./pages/EditProfile";
import Adminrouter from "./utils/Adminrouter";
import Admindashboard from "./pages/Admindashboard";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  // Pages where Header and Footer should NOT be shown
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin");

  return (
    <div>
      {/* Header */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        {/* Product Routes */}
        <Route
          path="/productinsert"
          element={
            <Prorouter>
              <ProductInsert />
            </Prorouter>
          }
        />

        <Route
          path="/productupdate/:id"
          element={
            <Prorouter>
              <ProductUpdate />
            </Prorouter>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

        {/* User Routes */}
        <Route
          path="/userprofile"
          element={
            <Prorouter>
              <Profile />
            </Prorouter>
          }
        />

        <Route
          path="/wishlist"
          element={
            <Prorouter>
              <Wishlist />
            </Prorouter>
          }
        />

        <Route
          path="/cart"
          element={
            <Prorouter>
              <AddToCart />
            </Prorouter>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <Prorouter>
              <EditProfile />
            </Prorouter>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <Adminrouter>
              <Admindashboard />
            </Adminrouter>
          }
        />
      </Routes>

      {/* Footer */}
      {!hideHeaderFooter && <Footer />}

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </div>
  );
};

export default App; 