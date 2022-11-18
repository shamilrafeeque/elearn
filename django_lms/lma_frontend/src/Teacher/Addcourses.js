import axios from 'axios';
import React,{useState,useEffect,useContext}  from 'react'
import { Link } from 
"react-router-dom";
import TeacherSidebar from '../Teacher/TeacherSidebar'
import AuthContext from '../context/AuthContext';
const baseUrl='http://localhost:8000/api/'
function TeacherAddCourses() {
    const {LoginTutor,tutor}=useContext(AuthContext)
    
    const[cats,setCats]=useState([])
    const[courseData,setCourseData]=useState({
        'teacher':`${tutor.tutor_id}`
    })
    useEffect(()=>{
        try{
            axios.get(baseUrl+'category/').then((res)=>{
                // localStorage.setItem()
                setCats(res.data)
                cats.forEach((category)=>{
                    console.log(category.title)
                })
                console.log(res.data)
                
                // console.log(category.id)
                
            
            });
        }catch(error){
            console.log(error)
        }
    },[]);
 

    // console.log(b.tutor.tutor_id,'kkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    
    // console.log(setCats,'jjjjjjjjjjjjjjjjjjjjj')


    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }
    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }
    const formSubmit=()=>{
        console.log(courseData)
        const _formData=new FormData();
        _formData.append('category',courseData.category);
        _formData.append('teacher',tutor.tutor_id);
        
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        _formData.append('featured_img',courseData.featured_img);
        _formData.append('techs',courseData.techs);
        try{
            console.log(_formData)
            axios.post(baseUrl+'addcourse/',_formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then((res)=>{
                console.log(res.data)
                console.log('after post image')
            })
        }catch(error){
            console.log('kkkdjjdjjjjjjjjjjjjjjjjjjjjjjjjj')
            console.log(error)
        }

    };
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar/>
            </aside>
            <section className='col-md-9'>
            <div className='card'>
                    <h5 className='card-header'>Add courses</h5>
                    <div className='card-body'>
                    <div className="mb-3 row">
                             <label for="inputPassword" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10">
                            <select name="category"
                            onChange={handleChange}
                                className="form-control">
                                    {cats.map((category,index)=>{return<option key={index} value={category.id}>{category.title}</option>})}
                            </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Title </label>
                            <div className="col-sm-10">
                            <input type="text" name="title"  onChange={handleChange}className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                            <input type="text"name="description" onChange={handleChange} className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Featured Image</label>
                            <div className="col-sm-10">
                            <input type="file" onChange={handleFileChange} name='featured_img' className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Technologies</label>
                            <div className="col-sm-10">
                            <input type="text" onChange={handleChange} name='techs'className="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        
                        <hr/>
                        <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default TeacherAddCourses