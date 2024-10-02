import React from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'

const Login = ({setToken}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
const onsubmitHandler=async(e)=>{
    try {
        
    e.preventDefault()
 const response =await axios.post('http://localhost:4000/api/user/admin',{email,password})
if(response.data.success){
setToken(response.data.token)
}
else{
    console.log("Error")
}
        
    } catch (error) {
        console.log(error)
        
    }
    e.preventDefault
}

  return (
    <div className='admin-login'>
        <form onSubmit={onsubmitHandler}>
        <h1 className='admin-pannel'>Admin Panel</h1>
        <div className="admin-email">
            <p>Email Address</p>
        <input onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type='text' placeholder='Enter Your email'/>
        </div>
        <div className="admin-password">
            <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} name='email' value={password} type='text' placeholder='password'/>
      <button className='admin-log'> Login </button>
      </div>
      </form>
    </div>
  )
}

export default Login
