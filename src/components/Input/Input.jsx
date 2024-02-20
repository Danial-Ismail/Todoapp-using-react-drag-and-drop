import React, { useState } from 'react'
import "./Input.css"
const Input = ({onSubmit}) => {
    const[input,setInput]=useState("")

    const handleSubmit=()=>{
        if(!input) return;

        onSubmit(input);

        setInput("");
    }
  return (
    <div className='container'>
       <input type='text' className='input' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter your tasks...'/>
       <button onClick={handleSubmit} className='button'>Add</button>
    </div>
  )
}

export default Input