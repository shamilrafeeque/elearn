import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import {Routes,Route} from 'react-router-dom'
import About from './About';
import CourseDetail from './CourseDetail';
import Login from '../User/Login';
import Signup from '../User/Register';
import Dashboard from '../User/Dashboard';
import MyCourses from '../User/MyCourses';
import FavourateCourses from '../User/FavourateCourses';
import RecommentedCourse from '../User/RecommentedCourse';
import ParofileSettings from '../User/ParofileSettings';
import ChangePassword from '../User/ChangePassword';
import TeacherLogin from '../Teacher/TeacherLogin';
import TeacherRegister from '../Teacher/TeacherRegister';
import TeacherDashboard from '../Teacher/TeacherDashboard';
import TeacherMyCourses from '../Teacher/TeacherCourses';
import TeacherParofileSettings from '../Teacher/TeacherParofileSettings';
import TeacherChangePassword from '../Teacher/TeacherChangePassword';
import TeacherAddCourses from '../Teacher/Addcourses';
import TeacherUsers from '../Teacher/TeacherUers';
import Admin from '../Admin/admin'
import Admins from '../Admin/Admins'
import TeacherLogout from '../Teacher/TeacherLogout';
import {AuthProvider} from '../context/AuthContext'
import PrivateRoute from '../utils/PrivateRoute';
import TeacherList from '../Admin/TeacherList';
import AddChapter from '../Teacher/AddChapter'
function Main() {
  return (
    <div className="App">
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/detail/:course_id" element={<CourseDetail/>}/>
        <Route path="/user-login" element={<Login/>}/>
        <Route path="/user-register" element={<Signup/>}/>
        <Route path="/user-dashboard" element={<Dashboard/>}/>
        
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/favorate-course" element={<FavourateCourses/>}/>
        <Route path="/recommende-courses" element={<RecommentedCourse/>}/>
        <Route path="/profile-setting" element={<ParofileSettings/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>

        <Route path="/teacher-login" element={<TeacherLogin/>}/>
        <Route path="/teacher-register" element={<TeacherRegister/>}/>
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
        
        <Route path="/teacher-courses" element={<TeacherMyCourses/>}/>
        <Route path="/add-course" element={<TeacherAddCourses/>}/>
        <Route path="/my-users" element={<TeacherUsers/>}/> 
        <Route path="/teacherprofile-setting" element={<TeacherParofileSettings/>}/>
        <Route path="/teacherchange-password" element={<TeacherChangePassword/>}/>
        <Route path="/teacher-logout" element={<TeacherLogout/>}/>
        <Route path="/add-chapter" element={<AddChapter/>}/>



        {/* admin */}

        {/* <Route element={<PrivateRoute/>} path='/'> */}
            {/* <Route path="/admin" element={<Admin/>}/> */}
        <Route path="/admins" element={<Admins/>}/>
        <Route path='/teacherlist' element={<TeacherList/>}/>
        {/* </Route> */}
        
        



        
      </Routes>
      
      <Footer/>
      </AuthProvider>
    </div>
  );
}

export default Main;
