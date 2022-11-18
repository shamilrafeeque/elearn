import React from 'react'
import Admins from './Admins'
import {Link } from 'react-router-dom'
import axios from 'axios'
function TeacherList() {
    // let[teacher,setTeacher]=useState()



    // let AllTeacher=()=>{
    //     axios.get()
    // }
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
                    <th>Actionddddddddddddddddddd</th>
                </tr>
            </thead>
            {/* {userData && userData.map((row)=>( */}
            <tbody>
               
                    <>
                    <td>jjjjj</td>
                    <td><Link to="/">jjjjjjj</Link></td>
                    <td>
                        <button className='btn btn-primary btn-danger active btn-sm'>BAN</button>
                        <span>  </span>
                        <button className='btn btn-primary btn-primary active btn-sm'>ACTIVE</button>
                    </td></>
              
                
            </tbody>
              {/* ))} */}
        </table>
        
    </div>
</div>
            </section>
            
      

</div>
    </div>
    
  )
}

export default TeacherList