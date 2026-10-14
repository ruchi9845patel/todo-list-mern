import React from 'react'
import {Link, Navigate,useNavigate} from 'react-router-dom'
import '../style/navbar.css'
import { useState } from 'react'
import { useEffect } from 'react'

const Navbar = () => {
  const[login,setLogin]=useState(localStorage.getItem('login'));
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('login')
    setLogin(null)
    navigate('/login')
  }
  useEffect(()=>{
      const handleStorgae=()=>{
        setLogin(localStorage.getItem('login'))
      }
      window.addEventListener("localStorage-change",handleStorgae)
      return ()=>{
        window.removeEventListener("localStorage-change",handleStorgae)
      }
  },[])
  return (
    <nav className='navbar'>
        <div className='logo'>To Do App</div>
        <ul className='nav-link'>
          {
            login?
            <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add Task</Link></li>
             <li><Link onClick={logout}>Logout</Link></li>
            </>:null
          }
            
        </ul>
    </nav>
  )
}


export default Navbar
