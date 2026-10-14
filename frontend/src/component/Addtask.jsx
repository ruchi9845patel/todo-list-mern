import React, { useState } from 'react'
import '../style/Addtask.css'
import { useNavigate } from 'react-router-dom';

const Addtask = () => {
    const[taskData,setTaskData]=useState();
    const navigate=useNavigate()
    const handleAddTask=async()=>{
        console.log(taskData)
        let result=await fetch("http://localhost:4000/add-task",{
            method:'Post',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        result=await result.json()
        if(result.success) {
            navigate("/")
            console.log("new task added")
        } else {
            alert("try after sometime....")
        }
    }
  return (
    <div className='container'>
        <h1>Add New Task</h1>
    
        <label htmlFor="">Title</label>
        <input onChange={(e)=>setTaskData({...taskData,title:e.target.value})} className='input' type="text" name='title' placeholder='Enter Task Title' />
        <label htmlFor="">Description</label>
        <textarea onChange={(e)=>setTaskData({...taskData,descripton:e.target.value})} className="input" rows={4} name="descripton" placeholder='Enter Task Dscription' id=""></textarea>
        <button onClick={handleAddTask} className='submit'>Add New Task</button>
  
    </div>
  )
}

export default Addtask
