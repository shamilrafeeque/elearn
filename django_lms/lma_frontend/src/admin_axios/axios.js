import BaseUrl from "../BaseUrl"
import axios from 'axios';



export const getAllUsers = () => {
    return new Promise((resolve, reject) => {

        const AccessToken = JSON.parse(localStorage.getItem('authToken')).access

        axios.get(BaseUrl+'users_list').then((response) => {
            console.log(response.data);
            console.log("getAllUsers Axios working");
            resolve(response.data)

        }).catch((err) => {
            console.log("getAllUsers Axios Not working");
            reject(err)


        })

    })

}
export const updateUserStatus = (updateTo,user_id) => {
    
        const AccessToken = JSON.parse(localStorage.getItem('authToken')).access

        const data = updateTo ? {'is_active': true}:{'is_active':false}
        axios.patch(BaseUrl+'user_details/'+user_id+'/',data).then((response) => {
            console.log(response.data);
            console.log("updateUserStatus Axios working");

        }).catch((err) => {
            console.log("updateUserStatus Not working");
            console.log(err);


        })

   

}