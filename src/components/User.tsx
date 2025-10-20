import axios, { AxiosError, type AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import type { User } from "../interfaces/User";




const User = ()=>{
    const [loggedIn, setLoggedIn] = useState<boolean>(false); 
    const[user, setUser] = useState<User>({}); 
    useEffect(()=>{
        setUser({
            userName : "u"
        }); 
    }, []); 
    // console.log(user);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUser({userName : e.target.value}); 
    }
    const handleLogin = async (event : React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault(); 
        // console.log(user);
        try {
            const response:AxiosResponse = await axios.get(`http://localhost:8080/api/user/name/${user.userName}`)    
            setUser({userName : response.data.userName}); 
            setLoggedIn(true); 
        } catch (error:AxiosError) {
            if(error.response.status==404){
                alert("user not found"); 
            }
        } 
        
    }
    return (
        <div>
        {loggedIn==false && <>
            <div>
            <p>login</p>
            <input 
            type="text" 
            value={user.userName}
            onChange={handleChange}
            >
            
            </input>
            <button onClick={handleLogin}>
            Login
            </button>
            </div>
            </>}
            {loggedIn && <div>currently logged in: {user.userName}</div>}
            </div>
        )
    };
    export default User; 
    