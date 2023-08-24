import React from 'react'
import {  useNavigate } from 'react-router-dom'

function NoPage() {
    const navigate = useNavigate()
  return (
   <div>
    <h1>404 Error No content</h1>
    <button onClick={()=>navigate("/")}>Home</button>
   </div>
  )
}

export default NoPage