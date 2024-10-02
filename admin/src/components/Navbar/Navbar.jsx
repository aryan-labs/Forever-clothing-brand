import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'
const Navbar = ({setToken}) => {
  return (
    <div>
    <div className='navbar'>
        <img src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} >Logout</button>
        
      
    </div>
    <hr></hr>
    </div>
  )
}

export default Navbar
