import { useEffect, useState } from 'react';
import './App.css';
import Students from './Components/Students';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Dashboard from './Components/Dashboard.js';
import AddStudents from './Components/AddStudents.js';
import EditStudents from './Components/EditStudents.js';
import NoPage from './Components/Nopage.js';
import LoginPage from './Components/LoginPage';

function App() {
  const [students, setStudents] = useState([]);
  const navigate =  useNavigate()
  useEffect(()=>{
    const getStudentDetails = async()=>{
      const res = await fetch(`https://students-backend-mu.vercel.app/students/all`, {
        method: "GET",
        headers : {
          "x-auth-token" : localStorage.getItem("token")
        }
      }); 
      const data = await res.json();
      setStudents(data.data)
    }
    if(!localStorage.getItem("token")){
      navigate("/login")
    }else {
      getStudentDetails()
    }

  }, [])
  
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element ={<Dashboard/>}/>

          <Route path="/students" element ={<Students
          students={students}
          setStudents={setStudents}
          />}/>

          <Route
          path="/add-student"
          element ={<AddStudents
            students={students}
            setStudents={setStudents}
          />}
          />

         <Route
         path="/edit/:id"
         element ={<EditStudents
             students={students}
            setStudents={setStudents}
         />}
         />

<       Route
         path="/login"
         element ={<LoginPage/>}
         />
      
       <Route
       path="*"
       element={<NoPage/>}/>
       
      </Routes>

    </div>
  );
}

export default App;
