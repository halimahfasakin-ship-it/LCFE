import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './component/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Rating from './pages/Rating'
import SelectStaff from './pages/SelectStaff'
import Staff from './pages/Staff'
import StaffPref from './pages/StaffPref'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import StaffRequests from './pages/StaffRequests'
import ManageProd from './pages/ManageProd'
import Cart from './pages/Cart'
import Cookies from 'universal-cookie'
import AuthGuard from './auth/AuthGuard'

const App = () => {
  const cookies = new Cookies()
  const isAuth = cookies.get("token")
  console.log("App token:", cookies.get("token"))
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/products' element={<Products />} />
        <Route element={<AuthGuard isAuth={isAuth} />}>
          <Route path="/product/:id" element={<Product />} />
          <Route path='/rating' element={<Rating />} />
          <Route path='/select-staff' element={<SelectStaff />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/staff-pref' element={<StaffPref />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/staff-request' element={<StaffRequests />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route element={<RoleGuard role="admin" />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage-products" element={<ManageProd />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App