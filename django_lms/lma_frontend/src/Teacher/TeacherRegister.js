import { Link } from 
"react-router-dom";
import React from 'react';
import {useEffect,useState,useContext} from 'react'
import AuthContext from "../context/AuthContext";
import axios from 'axios';

const baseUrl='http://localhost:8000/api/Tutorregister/'
function TeacherRegister() {
  let {SignupTutor,signupResError}=useContext(AuthContext);
  console.log('authcontext working')
  const [teacherData,setteacherData]=useState({
    full_name:'',
    email:'',
    password:'',
    qualification:'',
    mobile_no:'',
    skills:'',
    status:'',
  })
  //change element value
  const handleChange=(event)=>{
    setteacherData({
      ...teacherData,
      [event.target.name]:event.target.value
    });
  }
  // console.log(teacherData)
  // console.log('hello')
  // useEffect(()=>{
  //   document.title='Teacher Register';
  // });
  //submit form//
  const submitForm=(e)=>{
    e.preventDefault()
    console.log('submitform',teacherData)
    const teacherFormData=new FormData();
    teacherFormData.append("full_name",teacherData.full_name)
    teacherFormData.append("email",teacherData.email)
    teacherFormData.append("password",teacherData.password)
    teacherFormData.append("qualification",teacherData.qualification)
    teacherFormData.append("mobile_no",teacherData.mobile_no)
    teacherFormData.append("skills",teacherData.skills)
    
    try{
      axios.post(baseUrl,teacherFormData).then((response)=>{
        console.log(response.data)
        console.log('sha')
        setteacherData({
          full_name:'',
          email:'',
          password:'',
          qualification:'',
          mobile_no:'',
          skills:'',
          status:'success',
        
        })
        window.location.href='teacher-login';
      });
      
    }catch(error){
      console.log(error)
      setteacherData({'status':'error'})
    }
  };
  // const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  // if(teacherLoginStatus=='true'){
  //   window.location.href='teacher-dashboard';
  // }
    console.log('submit form')
    console.log(teacherData)
  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-6 offset-3">
        {teacherData.status=='success'&&<p class="text-success">Thanks for registrarion</p>}
        {teacherData.status=='error'&&<p class="text-danger">something went wrong</p>}
          <div className="card">
            <h5 className="card-header">Teacher Register</h5>
            <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Full name</label>
                <input value={teacherData.full_name} onChange={handleChange}name='full_name'type="text" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input value={teacherData.email} onChange={handleChange} name='email' type="email" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={teacherData.password} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword1"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Qualification</label>
                <input value={teacherData.qualification} onChange={handleChange} name='qualification' type="text" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Mobile number</label>
                <input value={teacherData.mobile_no} onChange={handleChange} name='mobile_no' type="number" className="form-control"/>
              </div>
              
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Skills</label>
                <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                <div id="emailHelp" className="form-text"></div>
              </div>
              
              <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default TeacherRegister