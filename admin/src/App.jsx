import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Add from './components/Add/Add'
import List from './components/List/List'
import Order from './components/Orders/Order'
import SideBar from './components/SideBar/SideBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Login from './components/Login/Login'
import { useState } from 'react'
import { useEffect } from 'react'


const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token'?localStorage.getItem('token'):""))

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div>
    { token ==="eyJhbGciOiJIUzI1NiJ9.YXJ5YW5AZ21haWwuY29tMTIzNDU2Nzg5.ZgkxkbBtYE3SawbRDKLGREPX8yvAN5TpO4NbwTfSbZw"?
      <div>
      <ToastContainer/>
      
      <Navbar setToken={setToken}
      ></Navbar>
      <div className='admin'>       <SideBar></SideBar>
      <Routes>
                <Route path='/add' element={<Add setToken={setToken}></Add>}/>
                <Route path='/list' element={<List setToken={setToken}></List>}/>
                <Route path='/order' element={<Order setToken={setToken}></Order>}/>
            </Routes>
</div>
            </div>
:<Login setToken={setToken}></Login>
    }
    </div>
  )
}

export default App
