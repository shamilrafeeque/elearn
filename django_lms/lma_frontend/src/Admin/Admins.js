// import React from 'react'
import { Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import axios from "axios";
import {getAllUsers} from '../admin_axios/axios'
// import AppContext from "../../Context/AppContext";
// import Sidebar from './Sidebar'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext";



function Admins() {
    // const {user}=useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false);
    let[userStatus,setUserStatus]=useState(true)
    let[userData,setUserData]=useState()

    const arr = [1,2,3,4,5,6]

    // let[userState,setUserState]=useState()


    let AllUsers=()=>{
        axios.get("http://localhost:8000/api/acounts/allusers/").then((response)=>{
            setUserData(response.data)
            console.log(response.data)
        })
    }
    useEffect(()=>{
        AllUsers();
    },[])

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
            data.map((user) =>{
                console.log(user.email);
            })
            console.log(loaded,data);
            
        })

    }, [userStatus])
    // useEffect(()=>{
    //     userData();
    //     // console.log(user)
    // })
  return (
    <div className="container mt-4">
        <div className="row">
        <aside className='col-md-3'>
        < div className='card'>
    {/* <h5 className='card-header'>Dashboard</h5> */}
    <div className='list-group llist-group-flush'>
        <Link to ="" className="list-group-item list-group-item-action">My Dashboard</Link>
        <Link to ="" className="list-group-item list-group-item-action">User List</Link>
        <Link to ="" className="list-group-item list-group-item-action">Teachers List</Link>
        <Link to ="" className="list-group-item list-group-item-action">Recommended courses</Link>
        <Link to ="" className="list-group-item list-group-item-action">profile setting</Link>
        <Link to ="" className="list-group-item list-group-item-action">Change password</Link>
        <Link to ="" className="list-group-item list-group-item-action text-danger">logout</Link>
    </div>
</div>
            </aside>
            <section className='col-md-9'>
            <div className='card'>
    <h5 className='card-header'>USERS LIST</h5>
    <div className='card-body'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>Is Active</th>
                    <th>Action</th>
                </tr>
            </thead>
            {users && users.map((user, i) => {
            <tbody>
               
                
                    <td>{user.username}</td>
                    <td><Link to="/admins">{user.email}</Link></td>
                    <td>{user.is_active === true ? "Yes" : "No"}</td>
                    <td>{user.is_active ? <p className="card btn btn-info disabled text-dark">Active</p>:<p className="card btn btn-warning disabled text-dark">InActive</p>}</td>
                                        <td>
                                            <p  className="text-decoration-none" >
                                                {user.is_active ? 
                                                    <p onClick={()=>{updateUserStatus(false,user.id);setUserStatus(!userStatus) }} className='card btn btn-warning text-dark text-decoration-none'>Block</p>
                                                    :
                                                    <p onClick={()=>{updateUserStatus(true,user.id);setUserStatus(!userStatus)}} className='card btn btn-info text-dark text-decoration-none'>UnBlock</p>
                                                }
                                                
                                            </p>
                                        </td>
              
                
            </tbody>
})}
        </table>
        
    </div>
</div>
            </section>
            
      

</div>
    </div>
    
  )
}
    //     <div style={{minHeight:'80vh',width:'100%',position:'relative',margin:'auto'}}>
    //   <Grid spacing={3}>
    //         <div style={{ margin: "10px auto", display: "flex", flexWrap: "wrap",width:'100%' }}>
    //           <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
    //             {/* <Grid item xs={12} lg={4}> */}
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   flexDirection: "column",
    //                 }}
    //               >
    //                 <GroupIcon sx={{ color: "skyblue", fontSize: "60px" }} />
    //                 <Typography>
    //                     {'kji'}
    //                   {/* Total Users:{homeResData && homeResData.total_users} */}
    //                 </Typography>
    //               </div>
    //             {/* </Grid> */}
    //           </Card>
    
    //           <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
    //             <Grid item>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   flexDirection: "column",
    //                 }}
    //               >
    //                 <SupervisedUserCircleIcon
    //                   align="center"
    //                   sx={{ color: "skyblue", fontSize: "60px" }}
    //                 />
    //                 <Typography mb>
    //                   {/* Total Writers:{homeResData && homeResData.total_writers} */}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //           </Card>
    
    //           <Card sx={{ height: "90px", width: "200px", margin: "5px" }}>
    //             <Grid item>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   flexDirection: "column",
    //                 }}
    //               >
    //                 <LibraryBooksIcon
    //                   align="center"
    //                   sx={{ color: "skyblue", fontSize: "60px" }}
    //                 />
    //                 <Typography mb>
    //                   {/* Total Blogs:{homeResData && homeResData.total_blogs} */}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //           </Card>
    
    //           {/* <AdminHomeCard */}
    //             text="Acive users"
    //             {/* count={homeResData && homeResData.active_users} */}
    //           {/* /> */}
    //           {/* <AdminHomeCard */}
    //               text= "Non Active Users"
    //               {/* count= {homeResData && homeResData.non_active_users}             */}
    //           {/* /> */}
              
    //           {/* <AdminHomeCard text='Blocked Blogs' count={homeResData&&homeResData.blocked_blogs} /> */}
    //           <br />
    //           <div
    //             style={{ display: "flex", flexWrap: "wrap", margin: "20px auto" }}
    //           >
    //             <div style={{ display: "flex", flexDirection: "column" }}>
    //               <Typography variant="h6" color={"purple"} align="center">
    //                 New users count
    //               </Typography>
    //               <BarChart
    //                 width={600}
    //                 height={300}
    //                 // data={usersChart}
    //                 margin={{
    //                   top: 5,
    //                   right: 30,
    //                   left: 20,
    //                   bottom: 5,
    //                 }}
    //                 barSize={20}
    //               >
    //                 <XAxis
    //                   dataKey="month"
    //                   scale="point"
    //                   padding={{ left: 10, right: 10 }}
    //                 />
    //                 <YAxis />
    //                 <Tooltip />
    //                 <Legend />
    //                 <CartesianGrid strokeDasharray="3 3" />
    //                 <Bar
    //                   dataKey="users"
    //                   fill="#8884d8"
    //                   background={{ fill: "#eee" }}
    //                 />
    //               </BarChart>
    //             </div>
    
    //             <div style={{ display: "flex", flexDirection: "column" }}>
    //               <Typography variant="h6" color={"purple"} align="center">
    //                 New blogs count
    //               </Typography>
    //               <BarChart
    //                 width={600}
    //                 height={300}
    //                 // data={blogsChart}
    //                 margin={{
    //                   top: 5,
    //                   right: 30,
    //                   left: 20,
    //                   bottom: 5,
    //                 }}
    //                 barSize={20}
    //               >
    //                 <XAxis
    //                   dataKey="month"
    //                   scale="point"
    //                   padding={{ left: 10, right: 10 }}
    //                 />
    //                 <YAxis />
    //                 <Tooltip />
    //                 <Legend />
    //                 <CartesianGrid strokeDasharray="3 3" />
    //                 <Bar
    //                   dataKey="blogs"
    //                   fill="#8884d8"
    //                   background={{ fill: "#eee" }}
    //                 />
    //               </BarChart>
    //             </div>
    //           </div>
    //         </div>
    //       </Grid>
    //     </div>
    //   );
    // }
    
//     <div className='container-fluid'>
//         <div className='row'>
//         <div className='col-sm-3 col-md-2'>
//         <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

//             {/* Sidebar - Brand */}
//             <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
//                 <div className="sidebar-brand-icon rotate-n-15">
//                     <i className="fas fa-laugh-wink"></i>
//                 </div>
//                 <div className="sidebar-brand-text mx-3">LearnOn <sup></sup></div>
//             </a>
//             {/*  */}
//             {/* Divider */}
//             <hr className="sidebar-divider my-0"/>

//             {/* Nav Item - Dashboard */}
//             <li className="nav-item active">
//                 <a className="nav-link" href="index.html">
//                     <i className="fas fa-fw fa-tachometer-alt"></i>
//                     <span>Dashboard</span></a>
//             </li>

//             {/* Divider */}
//             <hr className="sidebar-divider"/>

//             {/* Heading */}
//             <div className="sidebar-heading">
//                 Interface
//             </div>

//             {/* Nav Item - Pages Collapse Menu */}
//             <li className="nav-item">
//                 <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
//                     <i className="fas fa-fw fa-cog"></i>
//                     <span>Components</span>
//                 </a>
//                 <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
//                     <div className="bg-white py-2 collapse-inner rounded">
//                         <h6 className="collapse-header">Custom Components:</h6>
//                         <a className="collapse-item" href="buttons.html">Buttons</a>
//                         <a className="collapse-item" href="cards.html">Cards</a>
//                     </div>
//                 </div>
//             </li>

//             {/* Nav Item - Utilities Collapse Menu */}
//             <li className="nav-item">
//                 <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
//                     <i className="fas fa-fw fa-wrench"></i>
//                     <span>Utilities</span>
//                 </a>
//                 <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
//                     <div className="bg-white py-2 collapse-inner rounded">
//                         <h6 className="collapse-header">Custom Utilities:</h6>
//                         <a className="collapse-item" href="utilities-color.html">Colors</a>
//                         <a className="collapse-item" href="utilities-border.html">Borders</a>
//                         <a className="collapse-item" href="utilities-animation.html">Animations</a>
//                         <a className="collapse-item" href="utilities-other.html">Other</a>
//                     </div>
//                 </div>
//             </li>

//             {/* Divider */}
//             <hr className="sidebar-divider"/>

//             {/* Heading */}
//             <div className="sidebar-heading">
//                 Addons
//             </div>

//             {/* Nav Item - Pages Collapse Menu */}
//             <li className="nav-item">
//                 <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
//                     <i className="fas fa-fw fa-folder"></i>
//                     <span>Pages</span>
//                 </a>
//                 <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
//                     <div className="bg-white py-2 collapse-inner rounded">
//                         <h6 className="collapse-header">Login Screens:</h6>
//                         <a className="collapse-item" href="login.html">Login</a>
//                         <a className="collapse-item" href="register.html">Register</a>
//                         <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
//                         <div className="collapse-divider"></div>
//                         <h6 className="collapse-header">Other Pages:</h6>
//                         <a className="collapse-item" href="404.html">404 Page</a>
//                         <a className="collapse-item" href="blank.html">Blank Page</a>
//                     </div>
//                 </div>
//             </li>

//             {/* Nav Item - Charts */}
//             <li className="nav-item">
//                 <a className="nav-link" href="charts.html">
//                     <i className="fas fa-fw fa-chart-area"></i>
//                     <span>Charts</span></a>
//             </li>

//             {/* Nav Item - Tables */}
//             <li className="nav-item">
//                 <a className="nav-link" href="tables.html">
//                     <i className="fas fa-fw fa-table"></i>
//                     <span>Tables</span></a>
//             </li>

//             {/* Divider */}
//             <hr className="sidebar-divider d-none d-md-block"/>

//             {/* Sidebar Toggler (Sidebar) */}
//             <div className="text-center d-none d-md-inline">
//                 <button className="rounded-circle border-0" id="sidebarToggle"></button>
//             </div>

//             {/* Sidebar Message */}
//             {/* <div className="sidebar-card d-none d-lg-flex">
//                 <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
//                 <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
//                 <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
//             </div> */}

//         </ul>
//         </div>
//         </div>
//     </div>
//   )
// }

export default Admins