import axios from "axios"

export const userRegister = async (userName, password) =>{
    const response = await axios.post("http://localhost:8080/api/user/register", {
        userName : userName,
        password : password
    }); 
    return response ;
}

export const userLogin = async (userName, password) =>{
    const response = await axios.post("http://localhost:8080/api/user/login", {
        userName : userName, 
        password : password
    }); 
    return response; 
}

