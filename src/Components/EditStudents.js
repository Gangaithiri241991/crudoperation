import Base from '../Base/Base.js'
import {  useNavigate, useParams } from 'react-router-dom'
import { studentValiationSchema } from './AddStudents.js';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

function EditStudents({students, setStudents}) {
  const {id} = useParams();
  const studendData = students.find(stud => stud.id === id);
  const {values, 
    handleChange, 
    handleSubmit,
    handleBlur,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name: studendData.name,
      batch :studendData.batch,
      gender :studendData.gender,
      education:studendData.education
    }, 
    validationSchema : studentValiationSchema,
    onSubmit :(updatedStudent) =>{
      console.log(updatedStudent);
      updateStudent(updatedStudent);
    }
  })
    const navigate =  useNavigate()

    const updateStudent = async (updatedStudent)=>{
      try {
      //fetch and update data 
      const response = await fetch(`https://64717ed46a9370d5a41a611f.mockapi.io/students/${id}`,{
        method:"PUT",
        body:JSON.stringify(updatedStudent),
        headers:{
          "Content-Type":"application/json"
        }
      });
      
      const data = await response.json()
      console.log(data)
                //update the studenet
      const studIndex = students.findIndex((stud)=>stud.id === id);

    //    console.log(updatedStudent)
      students[studIndex] = data
      setStudents([...students])
      navigate("/students")
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Base
    title={"Edit Student"}
    description={"Fill the form to edit student info"}
    >
    <form onSubmit={handleSubmit}>
    <div className='form-group'>
        <h3>Add Student</h3>
        
        <TextField  label="Name" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Name of student'
         type="text"
         value={values.name}
         onChange={handleChange}
         onBlur={handleBlur}
         name="name"
         />
         {touched.name && errors.name ? 
          <div style={{color:"crimson"}}>
           {errors.name} 
          </div>  : ""}

        <TextField  label="Batch" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Batch of student'
         type="text"
         value={values.batch}
         onChange={handleChange}
         onBlur={handleBlur}
         name="batch"
         />
          {touched.batch && errors.batch ? 
          <div style={{color:"crimson"}}>
           {errors.batch} 
          </div>  : ""}

        <TextField  label="Gender" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Gender of student'
         type="text"
         value={values.gender}
         onChange={handleChange}
         onBlur={handleBlur}
         name="gender"
         />
          {touched.gender && errors.gender ? 
          <div style={{color:"crimson"}}>
           {errors.gender} 
          </div>  : ""}

        <TextField  label="Education" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Eductaion of student'
         type="text"
         value={values.education}
         onChange={handleChange}
         onBlur={handleBlur}
         name="education"
         />
          {touched.education && errors.education ? 
          <div style={{color:"crimson"}}>
           {errors.education} 
          </div>  : ""}
       <div>
        <Button
        type="submit"
        variant="contained"
        >Update Students</Button>
        </div>
    </div>
    </form>
</Base>
  )
}

export default EditStudents