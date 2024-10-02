import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Navigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext'
import LoginPopUp from '../LoginPopUp/LoginPopUp'


const Navbar = () => {
    const [comp,setComp]=useState("Home")
    const {search,showLogin,setShowLogin,
      setseach,
      searchbar,
      setsearchbar,token,setToken}=useContext(StoreContext)

      console.log(token)

  
  return (
    <div className='Navbar'>
      <img className='logo' src={assets.logo} alt=""/>
      <div className="Nav-comp">
        <ul>
            <NavLink to="/" className={comp==="Home"?"active":""}  onClick={()=>setComp("Home")}>HOME</NavLink>
            <NavLink to="/collection" className={comp==="Collection"?"active":""}  onClick={()=>setComp("Collection")}>COLLECTION</NavLink>
            <NavLink to="/About" className={comp==="About"?"active":""}  onClick={()=>setComp("About")}>ABOUT</NavLink>
            <NavLink to="/contact" className={comp==="Contact"?"active":""}  onClick={()=>setComp("Contact")}>CONTACT</NavLink>
        </ul> 
      </div>
      <div className="Nav-right">
        <img onClick={()=>setsearchbar(true)} src={assets.search_icon} alt=""/>
        <Link to='/cart'>
        <img  className='Nav-right' src={assets.cart_icon} alt=""/>
  
        </Link>
        
        {!token?<div> <button onClick={()=>setShowLogin(true)} className='sign-in'>Sign-in</button><div  className="edede">  <LoginPopUp></LoginPopUp></div> </div>:
    
      <div className="group1">
        
      <img src={assets.profile_icon} alt=''/>
      <div className="group">
          <p>My Profile</p>
          <NavLink to='/orders'><p>Orders</p></NavLink>
          <p onClick={()=>{setToken('')}}> Logout</p>
          
          </div>
          

      </div>
      }
      


       
    
        </div>

     
        </div>
     
    
  )
}

export default Navbar
