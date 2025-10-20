import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './components/User'
import FileUpload from './components/FileUpload'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'


function App() {
    // const [count, setCount] = useState(0)
    const [loggedIn, setLoggedIn] = useState<boolean>(false); 
    const[user, setUser] = useState<User>({}); 
    useEffect(()=>{
        setUser({
            userName : "u"
        }); 
    }, []);
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
        <>
        <div>
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
            <FileUpload user={user}></FileUpload>
            </div>
            </>
        )
    }
    
    export default App
    