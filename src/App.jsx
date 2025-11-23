import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';

import FileUpload from './components/FileUpload'
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Auth from './components/Auth'
import { MantineProvider } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './axiosRequests/auth';
import { setMe } from './reducers/auth';
import { checkJwtValid } from './custom/checkJwtValid';
import ProtectedRoutes from './components/protectedRoutes';
import NotLoggedIn from './components/NotLoggedIn';

function App() {
    
    
    const {currentUser} = useSelector((state) => state.auth); 
    const dispatch = useDispatch() ;
    const [isAuthenticated, setAuthenticated] = useState(false) ;
    const login = ()=> setAuthenticated(true); 
    const logout = ()=> setAuthenticated(false); 
    const token = window.localStorage.getItem("token"); 
    // const token = "nb"


    // fucntion to update store with user 
    const updateMetoStore = (currentUser) =>{
        dispatch(setMe(currentUser)) ;
        // console.log("dispatched user") ;
    }

    // to get the current user and the token
    // we check if the token is valid
    // if so, we send the request to get the current logged in user
    // check if jwt token is present and valid
    const fetchMe = async ()=>{
        
        console.log('token :>> ', token);
        if(!token){
            setAuthenticated(false); return ;
        }
        if(!checkJwtValid(token)){
            setAuthenticated(false); return ;
        }
        // console.log(token); 
        const {user, status} = (await getMe(token)).data; 
        // console.log("fetched me"); 
        setAuthenticated(true)
        updateMetoStore(user);
        console.log(user, status);

    }
    
    useEffect(()=>{
        if(!currentUser){
            fetchMe(); 
        }
    }, [token])

    
    return (
        <MantineProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth login={login} />}></Route>
                <Route path='/' element={<NotLoggedIn/>}></Route>
                <Route path='*' element={<NotLoggedIn/>}></Route>
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/home" element={
                        <Home currentUser={currentUser} logout={logout}></Home>
                    }></Route>
                </Route>
                <Route path={"/"} element={
                    <Home currentUser={currentUser} logout={logout}></Home>
                }></Route>
            </Routes>
                
            </BrowserRouter>
        </MantineProvider>
        
    )
}

export default App
