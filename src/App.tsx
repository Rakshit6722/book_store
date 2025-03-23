import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import BookPage from './pages/BookPage'
import MyOrders from './pages/MyOrders'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import OrderConfirmation from './pages/OrderConfirmation'
import Cart from './pages/Cart'
import AuthRoutes from './pages/AuthRoutes'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<AuthRoutes><Register/></AuthRoutes>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/login' element={<AuthRoutes><Login/></AuthRoutes>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/book/:id' element={<BookPage/>}/>
        <Route path='/myOrder' element={<MyOrders/>}/>
        <Route path='wishlist' element={<Wishlist/>}/>
        <Route path='/orderPlaced' element={<OrderConfirmation/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App
