import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { StoreContext } from '../Context/StoreContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
const LoginPopUp = () => {
    const {showLogin,setShowLogin,setToken,token}=useContext(StoreContext)
    const url="https://forever-clothing-brand-1-backend.onrender.com"
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    useEffect(()=>{

    },[data])
    const onchangeHandler=(e)=>{
      const name=e.target.name
      const value=e.target.value 
      setData(data=>({...data,[name]:value}))
    }
const onLogin=async(e)=>{
  e.preventDefault()
     if (currState === 'Sign Up') {
          
          const response = await axios.post( 'http://localhost:4000/api/user/register',data)
          if (response.data.success) {
               console.log(response.data.token)
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
           console.log("Erro")
          }

        } else {

          const response = await axios.post( 'http://localhost:4000/api/user/login', data)
          if (response.data.success) {
            console.log("save")
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {console.log("error")
          }

        }}

    const[currState,setCurrState]=useState('Login')
  return (
   
   showLogin?
    <div className='login-popup'>
    <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input name='name' value={data.name} onChange={onchangeHandler} type="text" placeholder='Your name' required/>}
        <input onChange={onchangeHandler}  name='email'  value={data.email} type="email" placeholder='Your email' required/>
        <input onChange={onchangeHandler} name='password' value={data.password} type="password" placeholder='Password' required/>
      </div>
      <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p className='continuee'>By continuing, i agree to the terms of use & privacy policy</p>
      </div>
      {currState==="Login"
      ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
      :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
      }
    </form>
</div>:""
  )
}

export default LoginPopUp
