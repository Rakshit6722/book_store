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


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/:id' element={<BookPage/>}/>
        <Route path='/myOrder' element={<MyOrders/>}/>
        <Route path='wishlist' element={<Wishlist/>}/>
      </Routes>
    </div>
  )
}

export default App
