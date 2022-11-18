import jwt_decode from  'jwt-decode';
import {createContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import jwt from 'jwt-decode';
import {useEffect,useContext} from 'react'
// import { applyAuthTokenInterceptor } from 'axios-jwt';


const AuthContext=createContext()

export default AuthContext;

export const AuthProvider =({children})=>{
    let [user,setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    let [tutor,setTutor] = useState(()=>localStorage.getItem('TutorauthTokens') ? jwt_decode(localStorage.getItem('TutorauthTokens')) : null)
    let [tutorTokens,setTutorTokens] = useState(()=>localStorage.getItem('setTutorauthTokens') ? JSON.parse(localStorage.getItem('setTutorauthTokens')) : null)

    
    let navigate = useNavigate();
    let [resData,setResData] = useState()
    let [signupResError,setSignupResError] = useState()
    let [signupResSuccess,setSignupResSuccess]= useState()
    let [loading,setLoading] = useState()

const BASE_URL='http://127.0.0.1:8000/'
const axiosInstance = axios.create({ baseURL: BASE_URL })
console.log(BASE_URL)
// const requestRefresh = async (refresh) => {
//     return axios.post(`${BASE_URL}api/acounts/token/refresh/b`, { refresh })
//     .then((response) => 
//     localStorage.setItem('authTokens',JSON.stringify(response.data.access_token)))
// };

// applyAuthTokenInterceptor(axiosInstance, { requestRefresh });  // Notice that this uses the axiosInstance instance.  <-- important
const getUserData = (id) => {
    axios.get('http://localhost:8000/api/'+'user_details/'+id).then(response =>{
        console.log("Got All user Details");
        console.log(response.data);
        localStorage.setItem('user_data',JSON.stringify(response.data));
        
    }).catch(error =>{
        console.log("Not working All user Details");
        console.log(error);
    })
    
}








let SignupUser=async(username,email,password,bio,mobile,interests)=>{
    await axios.post('http://127.0.0.1:8000/api/acounts/register/',{username:username,
        email:email,
        password:password,
        bio:bio,
        mobile:mobile,
        interests:interests}).then((response)=>{
        console.log("innser signup user")
        console.log(username)
        console.log(response.status)
        console.log(response.data)
        
        if (response.status===201){
            console.log('authcontecy')
            setSignupResSuccess('User registered successfully, Please verify with OTP')
            navigate('/user-login')
    }else{
        setSignupResError(response.data)
        console.log("not register erro")
    }
    })
}
let loginUser = async (email,password) =>{
    setLoading(true)
    let response = await fetch('http://127.0.0.1:8000/api/acounts/token/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'email':email,'password':password})
    })
    console.log(response,'llllllllllllllllllllllllll')
    console.log(response.data,'kkkkkkkkkkkkk')
    let data = await response.json()
    
    console.log(data,'haaaaaaaaaaaaaaaaaaaaaaaaaaai')
    console.log(data.access,'888888888888888888')
    console.log(data.refresh,'999999999999999999999999')
    let d = jwt_decode((data.access))
    console.log(d,'access token')
    let b = jwt_decode((data.refresh))
    console.log(b,'refresh tokem')
    if (response.status == 200){
        // setLoading(false)
        setAuthTokens(data)
        const a=setUser(jwt_decode(data.access))
        console.log(a,'kkkkkkkkkkkkkkkkkkkkkkkkkk')
        console.log(data.access)
        console.log(user)
        console.log(user.user_id)
        if (user.is_superuser){
            navigate('/admins')
        }else{
            navigate('/')
        }
        localStorage.setItem('authTokens',JSON.stringify(data))
        // console.log(response.user_id)
        // if (response.user_id==1){
        //     navigate('/admins')
        // } else{
        //     navigate('/')
        // }
           
       

       
    }else{
        setLoading(false)
        setResData('Invalid password or There is no account existing for this email.')
        
    }
}


let logoutUser=()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    setUser(null)
    console.log('logouuuuuuuuuuuutttttttttt')
    navigate('/user-login')
}

{/*Tutur start*/}



// let SignupTutor=async(full_name,email,password,qualification,mobile_no,skills)=>{
//     await axios.post('http://localhost:8000/api/Tutorregister/',{full_name:full_name,
//         email:email,
//         password:password,
//         qualification:qualification,
//         mobile_no:mobile_no,
//         skills:skills}).then((response)=>{
//         console.log("innser signup user")
//         console.log(full_name)
//         console.log(response.status)
//         console.log(response.data)
        
//         if (response.status===201){
//             console.log('authcontecy')
//             setSignupResSuccess('User registered successfully, Please verify with OTP')
//             navigate('/user-login')
//     }else{
//         setSignupResError(response.data)
//         console.log("not register erro")
//     }
//     })
// }

// login 27 command 10.15
// let LoginTutor=async(email,password)=>{
//     // setLoading(True)
//     let response=await fetch('http://localhost:8000/api/login-Tutor/',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//     },
//     body:JSON.stringify({'email':email,'password':password})
//  })
//  let data = await response.json()
//  if (response.status === 200){
//     //  setLoading(false)
//      setAuthTokens(data)
//      const a=setUser(jwt_decode(data.access))
//      console.log(a)
//      console.log(data.access)
//      console.log(user)
//      console.log(user.user_id)

//     localStorage.setItem('authTokens',JSON.stringify(data))
// }else{
//     setLoading(false)
//     setResData('Invalid password or There is no account existing for this email.')
    
// }
// }
// let LoginTutor = async (email,password) =>{
//     setLoading(true)
//     let response = await fetch('http://localhost:8000/api/login-Tutor/',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({'email':email,'password':password})
//     })
//     let data = await response.json()
//     if (response.status === 200){
//         setLoading(false)
//         setTutorTokens(data)
//         const a=setTutor(jwt_decode(data.access))
//         console.log(a)
//         console.log(data.access)
//         console.log(tutor)
//         console.log(tutor.tutor_id)
//         // if (user.user_id==1){
//         //     navigate('/admins')
//         // }else{
//         //     navigate('/')
//         // }
//         localStorage.setItem('TutorauthTokens',JSON.stringify(data))
//         // console.log(response.user_id)
//         // if (response.user_id==1){
//         //     navigate('/admins')
//         // } else{
//         //     navigate('/')
//         // }
           
       

       
//     }else{
//         setLoading(false)
//         setResData('Invalid password or There is no account existing for this email.')
        
//     }
// }
let LoginTutor = async (techerLoginData,res) =>{

    console.log("Form Submitted");
    console.log(techerLoginData);
    console.log(res.data);
    console.log(res);
    const token = res.data.token;
    const totor = jwt(token); // decode your token here
    localStorage.setItem('TutorauthTokens', token);
    console.log(totor,'kkkkkkkkkkkkkkkkkkkk')
    if (res.status === 200){
        
        setTutorTokens(res.data);

        var decoded = jwt_decode(res.data.token);
        console.log("Successfully logged in 1");
        console.log(decoded,';;;;;;;;;;;;;;;;;;;;;;;;;;');
        setTutor(decoded);
        console.log(tutor)
        // getUserData(decoded.tutor_id);
        console.log("Successfully logged in 2 ");
        // localStorage.setItem('tutor', JSON.stringify(decoded));
        // localStorage.setItem('TutorauthTokens', JSON.stringify(res.data));
        if(decoded.tutor_id) {
            navigate('/teacher-dashboard');
            
        }else{
            
            navigate('/teacher-login')
        }
    }else{
        console.log("Somthing is wrong");
    }


}
useEffect(()=>{
    console.log(tutor)
},[tutor])

let logoutTutor=()=>{
    setTutorTokens(null)
    setTutor(null)
    localStorage.removeItem('TutorauthTokens')
    setTutor(null)
    console.log('logouuuuuuuuuuuutttttttttt6666666666666666666666666')
    if(localStorage==null)
        navigate('/teacher-login')
    
}





let contextData = {
    SignupUser:SignupUser,
    authTokens:authTokens,
    signupResSuccess:signupResSuccess,
    signupResError:signupResError,
    loginUser:loginUser,
    user:user,
    logoutUser:logoutUser,
    // SignupTutor:SignupTutor,
    LoginTutor:LoginTutor,
    tutor:tutor,
    logoutTutor:logoutTutor,
    

    
}
return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
)
}