import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import BestSeller from './components/BestSeller/BestSeller'
import LatestCollection from './components/LatestCollection/LatestCollection'
import NewsLetterBox from './components/NewsLetterBox/NewsLetterBox'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products/Products'
import Home from './Pages/Home/Home'
import Collection from './Pages/Collection/Collection'
import ProductItem from './components/ProductItem/ProductItem'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Order from './Pages/Order/Order'
import Verify from './components/Verify'

const App = () => {
  return (
    <div className='app'>

      <Navbar></Navbar>
      
      <Routes>
        <Route path='/' element={<Home></Home>}/>
      <Route path='/product/:productId' element={<ProductItem></ProductItem>}/>
      <Route path='/collection' element={<Collection></Collection>}/>
      <Route path='/cart' element={<Cart></Cart>}/>
      <Route path='/placeorder' element={<PlaceOrder></PlaceOrder>}/>
      <Route path='/orders' element={<Order></Order>}/>
<Route path='/verify' element={<Verify></Verify>}/>
      </Routes> 
      <NewsLetterBox></NewsLetterBox>
      
    </div>
  )
}

export default App
