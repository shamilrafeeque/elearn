import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
// import { useContext } from 'react'

function Header() {
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  const userLoginStatus=localStorage.getItem('authTokens') 
  console.log(userLoginStatus)
  const tutorLoginStatus=localStorage.getItem('TutorauthTokens')
  const{user,logoutUser}=useContext(AuthContext)
  const{tutor, LoginTutor}=useContext(AuthContext)
  const{logoutTutor}=useContext(AuthContext)
  
  // console.log(user.user_id+"iiiiiiiiiiiiiiiiiiiiii")
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container">
    <Link className="navbar-brand" to="/">LearnOn</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <a className="nav-link" href="#">Courses</a>
        {/*  ssName="nav-link" to="/admins">Admin</Link> */}

        {/* <a className="nav-link" href="#">Teachers</a> */}
        {/* {user.user_id!=1 &&
        <> */}
        {/* {tutorLoginStatus==null &&
          <> */}
          <li className="nav-item dropdown">
              
             
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Teacher
            </a>
            
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {tutorLoginStatus==null&&
              <>
                    <li><Link className="dropdown-item" to="/teacher-login">login</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-register">
                      Register</Link></li>
                      </>
                }
              
               
              <>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="/teacher-dashboard">
                            Dashboard</Link></li>
          
              <li><Link className="dropdown-item" onClick={logoutTutor}>Logout</Link></li></>
            </ul>
          </li>
      
          {/* user dash */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {userLoginStatus==null && 
                <>
                <li><Link className="dropdown-item" to="/user-login">login</Link></li>
                <li><Link className="dropdown-item" to="/user-register">
                Register</Link></li></>}
            <>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="/user-dashboard">
                   Dashboard</Link></li>
              <li><a className="dropdown-item" onClick={logoutUser}>Logout</a></li></>
            </ul>
          </li>
         
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admins
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {userLoginStatus==null && 
                <>
                <li><Link className="dropdown-item" to="/user-login">login</Link></li>
                <li><Link className="dropdown-item" to="/user-register">
                Register</Link></li></>}
            <>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="/user-dashboard">
                   Dashboard</Link></li>
              <li><a className="dropdown-item" onClick={logoutUser}>Logout</a></li></>
            </ul>
          </li> */}
          {/* </>} */}
           {/* </>} */}
          
         
      </div>
    </div>
  </div>
</nav>
  );
}

export default Header;