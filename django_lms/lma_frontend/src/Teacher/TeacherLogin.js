import { Link } from "react-router-dom";
import React from 'react'
import AuthContext from "../context/AuthContext";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import BaseUrl from "../base";
import {useEffect,useState,useContext} from 'react'
import axios from 'axios';
// const baseUrl='http://localhost:8000/api/login-Tutor/'
function TeacherLogin() {
  let {LoginTutor,resData} = useContext(AuthContext)
  let navigate = useNavigate();
  const[tutor,setTutor]=useState()
  const [techerLoginData,setteacherLoginData]=useState({
    email:'',
    password:''
  })
  console.log('hais')
  const handleChange=(event)=>{
    setteacherLoginData({
      ...techerLoginData,
      [event.target.name]:event.target.value
    })
  }
  const submitForm=(e)=>{
    e.preventDefault()
    console.log(techerLoginData,'kkkkkkkkkkkkkk')
    const techerFormDatas=new FormData()
    techerFormDatas.append('email',techerLoginData.email)
    techerFormDatas.append('password',techerLoginData.password)
    try{
      axios.post(BaseUrl+'login-Tutor/',techerLoginData).then((res)=>{
        LoginTutor(techerLoginData,res)


        // console.log(res.data,'res.data')
        // const token = res.data.token;
        // const user = jwt(token); // decode your token here
        // localStorage.setItem('token', token);
        // console.log(user)



      // axios.post(baseUrl,techerFormDatas).then((res)=>{
      //   console.log(res.data,'res.data')
      //   const token = res.data.token;
      //   const user = jwt(token); // decode your token here
      //   localStorage.setItem('token', token);
      //   console.log(user)
        // dispatch(actions.authSuccess(token, user));
        // if(user){
        //   navigate('/teacher-dashboard')
        // }
    })
    .catch(err => {
      navigate('/teacher-login')
      // window.location.href='/teacher-login';
      // // dispatch(actions.loginUserFail());
  });



        // const b=res.data
        // console.log(b,'token')
        // console.log(techerFormDatas,'teacherFormDatas')
        // const a=setTutor(jwt_decode(res.data))
        // console.log(a,'decode response data')

        // if (res.data){
        //   localStorage.setItem('teacherLoginStatus')
        //   // localStorage.setItem('teacherLoginStatushhh',false)
        //   // localStorage.setItem('teacherLoginStatushhh',false)
        //   window.location.href='teacher-dashbord';
        // }
         
        //   console.log('hai')
        //   localStorage.setItem('teacherLoginStatus',true)
          // window.location.href='teacher-dashbord';
        
        // console.log(res.data)
        // console.log('hau')
    //   })
     }catch(error){
    //   window.location.href='teacher-dashbord';
        console.log(error)

     }
    // const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    // if(teacherLoginStatus=='true'){
    //   window.location.href='/teacher-dashbord';
    // }
    
    console.log('submitform',techerLoginData)
    console.log(techerLoginData)
  }
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header">Teacher Login</h5>
              <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" name="email" value={techerLoginData.email} onChange={handleChange} className="form-control"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password"  name="password" value={techerLoginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
                </div>
                {/* <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                  <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                </div> */}
                <button onClick={submitForm} type="submit" className="btn btn-primary">Login</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherLogin