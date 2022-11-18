import axios from 'axios';
import React, { useEffect,useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import TeacherSidebar from '../Teacher/TeacherSidebar'
import AuthContext from '../context/AuthContext';
const BaseUrl='http://localhost:8000/api/'
function TeacherMyCourses() {
    let {tutor}=useContext(AuthContext)
    const[courseData,setCourseData]=useState([]);


    useEffect(()=>{
        try{
            axios.get(BaseUrl+'Tutor-courses/'+tutor.tutor_id).then((res)=>{
                setCourseData(res.data);
            });
        }catch(error){
            console.log(error)
        }
    },[])
    console.log(courseData,'klklklklklklklklklklklklklklklklklklklklklklklkl')
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar/>
            </aside>
            <section className='col-md-9'>
            <div className='card'>
    <h5 className='card-header'>My Courses</h5>
    <div className='card-body'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Descriptions</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {courseData.map((course,index)=>
                <tr>
                <td>{course.title}</td>
                <td><Link to="/">{course.description}</Link></td>
                <td>
                    <button className='btn btn-danger btn-sm'>Delete</button>
                    {/* <span>  </span> */}
                    <Link className='btn btn-success btn-sm ms-2' to='/add-chapter'>Add chapter</Link>
                </td>
                </tr>
                )}
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

export default TeacherMyCourses