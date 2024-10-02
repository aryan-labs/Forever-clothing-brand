import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import Add from '../Add/Add'


const SideBar = () => {
  return (

    <div className='sidebar'>
        <NavLink to='/add'>        <div  className="add-items">
            <img src={assets.add_icon} alt=""/>
            <p>Add Items</p>
    
        </div>
      
        </NavLink>
<NavLink to='/list'>
        <div className="list-items">
            <img src={assets.order_icon} alt=""/>
            <p>List Items</p>
     
        </div>
        </NavLink>
        <NavLink to='/order'>
        <div className="orders">
            <img src={assets.order_icon} alt=""/>
            <p>orders</p>
   
    
        </div>
      </NavLink>
    </div>
  )
}

export default SideBar
