import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
function MyCourses() {
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <Sidebar/>
            </aside>
            <section className='col-md-9'>
            <div className='card'>
    <h5 className='card-header'>My Courses</h5>
    <div className='card-body'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Craeted at</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <td>react deveolpment</td>
                <td><Link to="/">Nikhil kilivayil</Link></td>
                <td>
                    <button className='btn btn-primary btn-danger active btn-sm'>Delete</button>
                </td>
            </tbody>
        </table>
        
    </div>
</div>
            </section>
        </div>
    </div>
//     <div className='card'>
//     <h5 className='card-header'>My Courses</h5>
//     <div className='card-body'>
//         <table className='table table-bordered'>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Craeted at</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <td>react deveolpment</td>
//                 <td><Link to="/">Nikhil kilivayil</Link></td>
//                 <td>
//                     <button className='btn btn-primary btn-danger active btn-sm'>Delete</button>
//                 </td>
//             </tbody>
//         </table>
        
//     </div>
// </div>
  )
}

export default MyCourses