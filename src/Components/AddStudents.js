import Base from '../Base/Base.js'
import {  useNavigate } from 'react-router-dom'
import { Button, TextField} from '@mui/material'
import * as yup from "yup"
import { useFormik } from 'formik'

export const studentValiationSchema = yup.object({
  name : yup.string().required("Please fill the name details"),
  batch :yup.string().required("please fill the batch details")
  .min(5,"Hey please fill proper batch name"),
  gender :yup.string().required("Please specify your gender"),
  education:yup.string().required("It is not bad to tell your education")
})



function AddStudents({students, setStudents}) {
  const {values, 
    handleChange, 
    handleSubmit,
    handleBlur,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name:"",
      batch :"",
      gender :"",
      education:""
    }, 
    validationSchema : studentValiationSchema,
    onSubmit :(newStudent) =>{
      console.log(newStudent);
      handleAddStudent(newStudent)
    }
  })

    const navigate = useNavigate()

    const handleAddStudent = async (newStudent)=>{

      try {

        const response = await fetch(`https://64717ed46a9370d5a41a611f.mockapi.io/students`, {
          method:"POST",
          body:JSON.stringify(newStudent),
          headers:{
            "Content-Type":"application/json"
          },
        })
        const data = await response.json();

         console.log(data)
         setStudents([...students, data])
        navigate("/students")
        
      } catch (error) {
        console.log(error)
      }

    }
  return (
    <Base
    title={"Add New Students"}
    description={"Fill the form to add new students"}
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
        >Add Students</Button>
        </div>
    </div>
    </form>
    </Base>
  )
}

export default AddStudents