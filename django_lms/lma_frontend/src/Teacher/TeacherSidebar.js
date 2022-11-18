import React from 'react'
import { Link } from 
"react-router-dom";
function TeacherSidebar() {
  return (
    <div className='card'>
    {/* <h5 className='card-header'>Dashboard</h5> */}
    <div className='list-group llist-group-flush'>
      <Link to ="/teacher-dashboard" className="list-group-item list-group-item-action">My Dashboard</Link>
        <Link to ="/teacher-courses" className="list-group-item list-group-item-action">My courses</Link>
        <Link to ="/add-course" className="list-group-item list-group-item-action">Add courses</Link>
        <Link to ="/my-users" className="list-group-item list-group-item-action">My users</Link>
        <Link to ="/teacherprofile-setting" className="list-group-item list-group-item-action">profile setting</Link>
        <Link to ="/teacherchange-password" className="list-group-item list-group-item-action">Change password</Link>
        <Link to ="/teacher-register" className="list-group-item list-group-item-action text-danger">logout</Link>
    </div>
</div>
  )
}

export default TeacherSidebar