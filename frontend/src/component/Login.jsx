import React from 'react'
import { useState } from 'react'
import '../style/Addtask.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const navigate=useNavigate()
    const [userData,setUserData]=useState()
    useEffect(()=>{
      if(localStorage.getItem('login')){
        navigate('/')
      }
    })
    const handleLogin=async()=>{
      console.log(userData)
      let result= await fetch("http://localhost:4000/login",{
        method:"Post",
        body:JSON.stringify(userData),
        headers:{
          'Content-Type':'Application/Json'
        },
        credentials:'include'
      })
      result=await result.json()
      if(result.success) {
        console.log(result)
        document.cookie="token="+result.token;
        localStorage.setItem('login',userData.email)
        window.dispatchEvent(new Event('localStorage-change'))
        navigate('/')

      } else {
        alert("try after some time")
      }
    }
  return (
    <div className='container'>
        <h1>Login</h1>
       <label htmlFor="">Email</label>
          <input onChange={(e)=>setUserData({...userData,email:e.target.value})} type="text" name="Email" placeholder='enter user email'/>

          <label htmlFor="">Password</label>
          <input onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" name="password" placeholder='enter user password'/>
          <button onClick={handleLogin} className='submit'>Login</button>
          <Link className='link' to="/signup">Sign Up</Link>
    </div>
  )
}

export default Login
