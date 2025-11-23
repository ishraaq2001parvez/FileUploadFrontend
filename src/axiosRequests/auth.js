import axios from "axios"

const BACKEND = "http://localhost:8080/api"
export const userRegister = async (userName, password) =>{
    const response = await axios.post(`${BACKEND}/user/register`, {
        userName : userName,
        password : password
    }); 
    return response ;
}

export const userLogin = async (userName, password) =>{
    const response = await axios.post(`${BACKEND}/user/login`, {
        userName : userName, 
        password : password
    }); 
    return response; 
}

export const getMe = async (token) =>{
    const response = await axios.get(`${BACKEND}/user/me`, {
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    }); 
    return response;
}
