import axios from "axios"

const BACKEND = "http://localhost:8080/api/user"
export const userRegister = async (userName, password) =>{
    const response = await axios.post(`${BACKEND}/register`, {
        userName : userName,
        password : password
    }); 
    return response ;
}

export const userLogin = async (userName, password) =>{
    const response = await axios.post(`${BACKEND}/login`, {
        userName : userName, 
        password : password
    }); 
    return response; 
}

export const getMe = async (token) =>{
    const response = await axios.get(`${BACKEND}/me`, {
        headers :{
            'Authorization' : `Bearer ${token}`
        }
    }); 
    return response;
}
