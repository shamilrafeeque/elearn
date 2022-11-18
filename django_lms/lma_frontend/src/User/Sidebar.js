import React from 'react'
import { Link } from 
"react-router-dom";
function Sidebar() {
  return (
    <div className='card'>
    {/* <h5 className='card-header'>Dashboard</h5> */}
    <div className='list-group llist-group-flush'>
      <Link to ="/user-dashboard" className="list-group-item list-group-item-action">My Dashboard</Link>
        <Link to ="/my-courses" className="list-group-item list-group-item-action">My courses</Link>
        <Link to ="/favorate-course" className="list-group-item list-group-item-action">Favourate courses</Link>
        <Link to ="/recommende-courses" className="list-group-item list-group-item-action">Recommended courses</Link>
        <Link to ="/profile-setting" className="list-group-item list-group-item-action">profile setting</Link>
        <Link to ="/change-password" className="list-group-item list-group-item-action">Change password</Link>
        <Link to ="/user-register" className="list-group-item list-group-item-action text-danger">logout</Link>
    </div>
</div>
  )
}

export default Sidebar