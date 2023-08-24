import React, { useEffect } from 'react'
import Base from '../Base/Base.js'
import { useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';

const Students = ({students, setStudents}) => { 
  const navigate =  useNavigate()
  useEffect(()=>{
   if(!localStorage.getItem("token")){
      navigate("/login", {replace:true})
   }
  })

    const deleteStudent = async (studentId)=>{
      try {
        const res = await fetch(`https://64717ed46a9370d5a41a611f.mockapi.io/students/${studentId}`, {
          method:"DELETE"
        });
        const data = await res.json()
        console.log(data)

          const removedStudent = students.filter(student=>student.id !== studentId);
          setStudents(removedStudent)
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
        <Base 
        title={"Students Info"}
        description={"All studnets info will be displayed here"}
        >
        <div className='stud-collection'>
          {students.map((stud, idx)=>(
            <Paper elevation={6} className='stud-card' key={idx}>
               <h2>{stud.name}</h2>
               <p>Batch : {stud.batch}</p>
               <p>Gender : {stud.gender}</p>
               <p>Education : {stud.education}</p>
               <div className ='card-btn-group'>
               <Button color="secondary" onClick={()=>navigate(`/edit/${stud.id}`)}>Edit</Button >
               <Button color="error" onClick={()=>deleteStudent(stud.id)}>Delete</Button>
               </div>
            </Paper>
          ))}
        </div>
        </Base>
  )
}

export default Students