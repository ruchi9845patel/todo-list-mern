import React, { useEffect, useState } from 'react'
import '../style/Addtask.css'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {
    const[taskData,setTaskData]=useState();
    const navigate=useNavigate()
    const {id}=useParams()
    console.log(id)
    useEffect((()=>{
        getTask(id)
    }),[])
    const getTask=async(id)=>{
        let task=await fetch(`http://localhost:4000/task/${id}`)
        task=await task.json()
        if(task.result) {
            setTaskData(task.result)
        }

    }
    const UpdateTask=async()=>{
        console.log("fuction call",taskData)
        let task=await fetch("http://localhost:4000/update-task",{
            method:"Put",
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'Application/Json'
            }
        });
        task= await task.json
        if(task) {
            navigate('/')
        }
    }
   
  return (
    <div className='container'>
        <h1>Update Task</h1>
    
        <label htmlFor="">Title</label>
        <input value={taskData?.title} onChange={(e)=>setTaskData({...taskData,title:e.target.value})} className='input' type="text" name='title' placeholder='Enter Task Title' />
        <label htmlFor="">Description</label>
        <textarea value={taskData?.descripton} onChange={(e)=>setTaskData({...taskData,descripton:e.target.value})} className="input" rows={4} name="descripton" placeholder='Enter Task Dscription' id=""></textarea>
        <button  onClick={UpdateTask} className='submit'>Update Task</button>
  
    </div>
  )
}

export default UpdateTask
