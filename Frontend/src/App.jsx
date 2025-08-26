import { useState } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import {Routes , Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './Pages/Login'
import {Toaster} from 'react-hot-toast'
import AllProducts from './Pages/AllProducts'
import ProductCategory from './Pages/ProductCategory'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrders from './Pages/MyOrders'
import SellerLogin from './Pages/Seller/SellerLogin'
import SellerLayout from './Pages/Seller/SellerLayout'
import AddProduct from './Pages/Seller/AddProduct'
import Orders from './Pages/Seller/Orders'
import ProductList from './Pages/Seller/ProductList'

function App() {
   const {showLogin , isSeller } = useAppContext();
   const isSellerPath = useLocation().pathname.includes('seller');

  return (
    <div className=''>
    {!isSellerPath ? <Navbar /> : null}
    {!showLogin ? null : <Login />}
    <Toaster />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<AllProducts />} />
      <Route path='/:category' element={<ProductCategory />} />
      <Route path='/products/:category/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/add-address' element={<AddAddress/>} />
      <Route path='/orders' element={<MyOrders/>} />
      <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />} >
      <Route index element={<AddProduct />} />
      <Route path='/seller/orders' element={<Orders />} />
      <Route path='/seller/product-list' element={<ProductList />} />
      </Route>
      
    </Routes>
    {!isSellerPath ? <Footer /> : null}
    </div>
  )
}

export default App
