import React, { useState } from 'react'
import Navbar from './component/Navbar'
import './style/navbar.css'
import './style/App.css'
import { Route, Routes } from 'react-router-dom'
import Addtask from './component/Addtask'
import List from './component/List'
import UpdateTask from './component/UpdateTask'
import Signup from './component/Signup'
import Login from './component/Login'
import Protected from './component/Protected'

const App = () => {
  
  return (
    <div>
      <Navbar/>
     <Routes>
      <Route path="/" element={<Protected><List/></Protected>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/add" element={<Protected><Addtask/></Protected>}/>
      <Route path='/update/:id' element={<Protected><UpdateTask/></Protected>}/>
     </Routes>
    </div>
  )
}

export default App
