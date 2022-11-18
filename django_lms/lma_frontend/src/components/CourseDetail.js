import React from 'react'
import {useParams} from 'react-router-dom'
function CourseDetail() {
    let {course_id}=useParams();
  return (
   <div className='container mt-3'>
        <div className='row'>
            <div className='col-4'>
                <img src="/logo512.png" className="img-thumbnail" alt="pic"/>
            </div>
            <div className='col-8'>
                <h3>course details</h3>
                <p>Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with .g-0 and use .col-md-* classes to make the card horizontal at the md breakpoint. Further adjustments may be needed depending on your card content.</p>
                <p className='fw-bold'>course by: <a href="#">nikhil kilivayil</a></p>
                <p className='fw-bold'>Duaration:5 Hrs 30 minutes</p>
                <p className='fw-bold'>Total Enrolled student:230</p>
                <p className='fw-bold'>Rating:3/5</p>
                
            </div>
        </div> 
        {/* cours vedios */}
        <div className="card mt-3">
        <div className="card-header">
           < h2>Course vedios</h2>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">introduction
              <span className='float-end'>
                <span className='me-5'>1 Hrs 30 minutes</span>
              <button className='btn btn-sm btn-danger'><i className="bi bi-youtube"></i></button>
              </span>
           </li>
           <li className="list-group-item">introduction
              <span className='float-end'>
                <span className='me-5'>1 Hrs 30 minutes</span>
              <button className='btn btn-sm btn-danger'><i className="bi bi-youtube"></i></button>
              </span>
           </li>
           <li className="list-group-item">introduction
              <span className='float-end'>
                <span className='me-5'>1 Hrs 30 minutes</span>
              <button className='btn btn-sm btn-danger'><i className="bi bi-youtube"></i></button>
              </span>
           </li>
           <li className="list-group-item">introduction
              <span className='float-end'>
                <span className='me-5'>1 Hrs 30 minutes</span>
              <button className='btn btn-sm btn-danger'><i className="bi bi-youtube"></i></button>
              </span>
           </li>
           <li className="list-group-item">introduction
              <span className='float-end'>
                <span className='me-5'>1 Hrs 30 minutes</span>
              <button className='btn btn-sm btn-danger'><i className="bi bi-youtube"></i></button>
              </span>
           </li>

            
        </ul>
        </div>
        <h3 className='pb-1 my-4 mt-5'>Related Courses</h3>
    <div className='row  mb-5'>
      <div className='col-md-3'>
      <div className="card">
          <a href='#'><img src="/logo512.png" className="card-img-top" alt="pic"/></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Tittle</a></h5>
           
            
          </div>
        </div>
      </div>
      <div className='col-md-3'>
      <div className="card">
          <a href='#'><img src="/logo512.png" className="card-img-top" alt="pic"/></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Tittle</a></h5>
           
            
          </div>
        </div>
      </div>
      <div className='col-md-3'>
      <div className="card">
          <a href='#'><img src="/logo512.png" className="card-img-top" alt="pic"/></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Tittle</a></h5>
           
            
          </div>
        </div>
      </div>
      <div className='col-md-3'>
      <div className="card">
          <a href='#'><img src="/logo512.png" className="card-img-top" alt="pic"/></a>
          <div className="card-body">
            <h5 className="card-title"><a href="#">Course Tittle</a></h5>
           
            
          </div>
        </div>
      </div>
      

      


    </div>
   </div>
  )
}

export default CourseDetail