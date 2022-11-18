import { Link } from 
"react-router-dom";
import React from 'react'
import {useContext,useEffect,useState} from 'react'
import axios from "axios";
import AuthContext from "../context/AuthContext";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './Register.css'
// const baseUrl='http://127.0.0.1:8000/api/acounts/register/'
// function Signup() {
//   const [teacherData,setteacherData]=useState({
//     username:'',      
//     email:'',
//     password:'',
//     bio:'',
//     mobile:'',
//     interests:'',
   
//   })
//   //change element value
//   const handleChange=(event)=>{
//     setteacherData({
//       ...teacherData,
//       [event.target.name]:event.target.value
//     });
//   }
//   // console.log(teacherData)
//   // console.log('hello')
//   // useEffect(()=>{
//   //   document.title='Teacher Register';
//   // });
//   //submit form//
//   const submitForm=(e)=>{
//     e.preventDefault()
//     console.log('submitform',teacherData)
//     const teacherFormData=new FormData();
//     teacherFormData.append("username",teacherData.username)
//     teacherFormData.append("email",teacherData.email)
//     teacherFormData.append("password",teacherData.password)
//     teacherFormData.append("bio",teacherData.bio)
//     teacherFormData.append("mobile",teacherData.mobile)
//     teacherFormData.append("interests",teacherData.interests)
    
//     try{
//       axios.post(baseUrl,teacherFormData).then((response)=>{
//         console.log(response.data)
//         console.log('sha')
//         setteacherData({
//           username:'',
//           email:'',
//           password:'',
//           bio:'',
//           mobile:'',
//           interests:'',
//           status:'success',
        
//         })
//         window.location.href='user-login';
//       });
      
//     }catch(error){
//       console.log(error)
//       setteacherData({'status':'error'})
//     }
//   };
//   // const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
//   // if(teacherLoginStatus=='true'){
//   //   window.location.href='teacher-dashboard';
//   // }
//     console.log('submit form')
//     console.log(teacherData)









function Signup(){
  let {SignupUser,signupResError}=useContext(AuthContext);
  console.log('hai')
  let[username,setUserName]=useState()
  let[email,setEmail]=useState()
  let[password,setPassword]=useState()
  let[bio,setBio]=useState()
  let[mobile,setMobile]=useState()
  let[interests,setInterests]=useState()

  let [fieldError, setFieldError] = useState();

  useEffect(() => {
    let timeId = setTimeout(() => {
      setFieldError(false);
    });
  }, 5000);


  let fieldValidation = (e) => {
    e.preventDefault();
    if (username != null) {
      const re = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z]){3,18}[a-zA-Z]$/i;

      if (bio.length > 2 ) {
        const regEx =
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regEx.test(email)) {
          const regex =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;

          if (regex.test(mobile) && mobile.length === 10) {
            if (password.length > 5 ) {
              SignupUser(
                username,
                email,
                password,
                bio,
                mobile,
                interests
              );
          
            } else {
              setFieldError("Password is empty or does not matching.");
            }
          } else {
            setFieldError("Invalid Phone number or field in empty");
          }
        } else {
          setFieldError("Invalid email address or field in empty");
        }
      } else {
        setFieldError("Bio must contain atleast 5 characters.");
      }
    } else {
      setFieldError("Please enter your details");
    }
  };


  let handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    // console.log(setUserName)
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };
  let handlePasswords = (e) => {
    setPassword(e.target.value);
  };
  let handleBio = (e) => {
    setBio(e.target.value);
  };
  let handleMobile = (e) => {
    setMobile(e.target.value);
  };
  let handleInterests = (e) => {
    setInterests(e.target.value);
  };


//   return (
//     <div className="container mt-4">
//     <div className="row">
//       <div className="col-6 offset-3">
//           <div className="card">
//             <h5 className="card-header">User Register</h5>
//             <div className="card-body">
//             <form>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">User Name</label>
//                 <input value={teacherData.username} onChange={
//                   handleChange
//                 }  name='username' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Email</label>
//                 <input value={teacherData.email} onChange={handleChange}
//                 name='email' type="email" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">bio</label>
//                 <input value={teacherData.bio} onChange={handleChange}
//                 name='bio' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputPassword1" className="form-label">Password</label>
//                 <input value={teacherData.password}  onChange={handleChange}
//                 name='password' type="password" className="form-control" id="exampleInputPassword1"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Mobile</label>
//                 <input value={teacherData.mobile} onChange={handleChange}
//                 name='mobile' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Interests</label>
//                 <textarea value={teacherData.interests} onChange={handleChange}
//                 name='interests' className="form-control"></textarea>
//                 <div id="emailHelp" className="form-text"></div>
//               </div>
              
//               <button onClick={submitForm}type="submit" className="btn btn-primary">Register</button>
//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }



return (
  <div>
    <Grid>
      <Paper elevation={5} className="paper_signup">
        <Grid align="center" className="grid_signup">
          <Avatar sx={{ bgcolor: blue[500] }}>
            <ExitToAppIcon />
          </Avatar>
          <Typography variant="h4" className="typo_signup">
            Signup
          </Typography>
        </Grid>
        <Grid>
          {signupResError ? (
            <Alert severity="error">{signupResError}</Alert>
          ) : null}

          {fieldError ? <Alert severity="error">{fieldError}</Alert> : null}

          <form onSubmit={fieldValidation} noValidate>
            <TextField
              name="username"
              onChange={handleUserName}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="text"
              label="User Name"
              placeholder="Enter user Name"
              fullWidth="true"
            ></TextField>
            
  
                
            <TextField
              name="email"
              onChange={handleEmail}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="email"
              label="Email"
              placeholder="Enter email"
              fullWidth="true"
            ></TextField>

            <TextField
              name="password"
              onChange={handlePasswords}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="paswword"
              label="Password"
              placeholder="Enter password"
              fullWidth="true"
            ></TextField>
            <span style={{color:'red'}}>*</span><Typography variant="caption" style={{ color: "" }}>
              Password must contain atleast 6 characters
            </Typography>

            <TextField
              name="bio"
              onChange={handleBio}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="text"
              label="Bio"
              placeholder="Enter Bio"
              fullWidth="true"
            ></TextField>

            <TextField
              name="mobile"
              onChange={handleMobile}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="text"
              label="Mobile num"
              placeholder="Mobile num"
              fullWidth="true"
            ></TextField>
            

            <TextField
              name="interests"
              onChange={handleInterests}
              style={{ marginTop: "10px" }}
              variant="standard"
              type="text"
              label="Interests"
              placeholder="Interests"
              fullWidth="true"
            ></TextField>

            <Button
              type="submit"
              style={{ marginTop: "20px" }}
              fullWidth="true"
              className="button1"
              variant="outlined"
            >
              signup
            </Button>
            <br />
            <br />
          </form>
          <Typography variant="body2">
            Have an account?
            <Link
              style={{
                marginTop: "30px",
                color: "#0033cc",
                textDecoration: "none",
              }}
              to="/user/login"
            >
              Signin
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  </div>
);
}


export default Signup;



// const baseUrl='http://127.0.0.1:8000/api/accoounts/user/'
// function UserRegister(){
//   const[userData,setuserData]=useState({
//     email:'',
//     username:'',
//     password:'',
//     bio:'',
//     mobile:'',
//     interests:'',
//     is_active:'',
//     is_superuser:'',
//     id:'',
//     status:'',
//   })

// const handleChange=(event)=>{
//   setuserData({
//     ...userData,
//     [event.target.name]:event.target.value
//   });
// }
// const submitForm=(e)=>{
//   e.preventDafault()     
//   console.log('suvmit user reg',userData)
//   const teacherFormData=new FormData();
//   teacherFormData.append("email",userData.email)
//   teacherFormData.append("username",userData.username)
//   teacherFormData.append("password",userData.password)
//   teacherFormData.append("bio",userData.bio)
//   teacherFormData.append("mobile",userData.mobile)
//   teacherFormData.append("interests",userData.interests)
  
//   try{
//     axios.post(baseUrl,teacherFormData).then((response)=>{
//       console.log(response.data)
//       console.log('sha')
//       setuserData({
//         full_name:'',
//         email:'',
//         password:'',
//         qualification:'',
//         mobile_no:'',
//         skills:'',
//         status:'success',
      
//       })
//       window.location.href='teacher-login';
//     });
    
//   }catch(error){
//     console.log(error)
//     setuserData({'status':'error'})
//   }
// };
// console.log('submit form')
// console.log(userData)


//   return (
//     <div className="container mt-4">
//     <div className="row">
//       <div className="col-6 offset-3">
//           <div className="card">
//             <h5 className="card-header">User Register</h5>
//             <div className="card-body">
//             <form>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">User Name</label>
//                 <input  onChange={
//                   handleChange
//                 }  name='username' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Email</label>
//                 <input value={userData.email} onChange={handleChange}
//                 name='email' type="email" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">bio</label>
//                 <input value={userData.bio} onChange={handleChange}
//                 name='bio' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputPassword1" className="form-label">Password</label>
//                 <input value={userData.password} onChange={handleChange}
//                 name='password' type="password" className="form-control" id="exampleInputPassword1"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Mobile</label>
//                 <input value={userData.mobile} onChange={handleChange}
//                 name='mobile' type="text" className="form-control"/>
//               </div>
//               <div className="mb-3">
//                 <label for="exampleInputEmail1" className="form-label">Interests</label>
//                 <textarea value={userData.interests} onChange={handleChange}
//                 name='interests' className="form-control"></textarea>
//                 <div id="emailHelp" className="form-text"></div>
//               </div>
              
//               <button onClick={submitForm}type="submit" className="btn btn-primary">Register</button>
//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }
