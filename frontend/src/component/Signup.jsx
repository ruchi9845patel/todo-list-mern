import React from 'react'
import '../style/Addtask.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate()
    const [userData,setUserData]=useState()
     useEffect(()=>{
          if(localStorage.getItem('login')){
            navigate('/')
          }
        })
    const handleSignup=async()=>{
      console.log(userData)
      let result= await fetch("http://localhost:4000/signup",{
        method:"Post",
        body:JSON.stringify(userData),
        headers:{
          'Content-Type':'Application/Json'
        }
      })
      result=await result.json()
      if(result.success) {
        console.log(result)
        document.cookie="token="+result.token;
        localStorage.setItem('login',userData.email)
        navigate('/')
      } else {
        alert("try after sometime....");
      }
    }
  return (
  <div className='container'>
          <h1>Sign Up</h1>
          <label htmlFor="">Name</label>
          <input onChange={(e)=>setUserData({...userData,name:e.target.value})} type="text" name="name" placeholder='enter user name'/>

          <label htmlFor="">Email</label>
          <input onChange={(e)=>setUserData({...userData,email:e.target.value})} type="text" name="Email" placeholder='enter user email'/>

          <label htmlFor="">Password</label>
          <input onChange={(e)=>setUserData({...userData,password:e.target.value})} type="text" name="password" placeholder='enter user password'/>
          <button onClick={handleSignup} className='submit'>Sign Up</button>
          <Link className='link' to="/login">Login</Link>
  </div>
  )
}

export default Signup
