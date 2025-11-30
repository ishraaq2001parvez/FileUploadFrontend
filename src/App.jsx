import '@mantine/core/styles.css';
import { useEffect, useState } from 'react';
import './App.css';

import { MantineProvider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getMe } from './axiosRequests/auth';
import Auth from './components/Auth';
import Home from './components/Home';
import NotLoggedIn from './components/NotLoggedIn';
import ProtectedRoutes from './components/protectedRoutes';
import { authContext } from './custom/contexts/authContext';
import { checkJwtValid } from './custom/checkJwtValid';
import { setMe } from './reducers/auth';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import FileUploader from './custom/FileUploader';

 


function App() {
    
    
    
    const {currentUser} = useSelector((state) => state.auth); 
    const dispatch = useDispatch() ;
    const [isAuthenticated, setAuthenticated] = useState(true) ;
    const login = ()=> {setAuthenticated(true); }
    const logout = ()=> {setAuthenticated(false); }
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
        
        // console.log('token :>> ', token);
        if(!token){
            setAuthenticated(false); 
            console.log("no token, please login")
            return ;
        }
        if(!checkJwtValid(token)){
            setAuthenticated(false); 
            console.log("jwt expired")
            return ;
        }
        // console.log(token); 
        const {data} = await getMe(token); 
        // console.log(data); 
        setAuthenticated(true); 
        updateMetoStore(data.user);
        // console.log(data.user, data.status, isAuthenticated);

    }
    
    useEffect(()=>{
        if(!currentUser){
            fetchMe(); 
            // setAuthenticated(true)
        }
    }, [token])

    
    return (
        <authContext.Provider value={{currentUser, isAuthenticated, logout, setAuthenticated}}>
            <MantineProvider>
                <BrowserRouter>
                <Routes>
                    <Route element={
                        <ProtectedRoutes
                            currentUser={currentUser}
                            logout={logout}
                            isAuthenticated={isAuthenticated}
                        ></ProtectedRoutes>
                    }>
                        <Route path="/home" element={
                            <Home></Home>
                        }></Route>
                        <Route path="/search" element={
                            <SearchResults></SearchResults>
                        }></Route>
                        <Route path={"/"} element={
                            <Home currentUser={currentUser} logout={logout}></Home>
                        }></Route>
                    </Route>
                    <Route path="/auth" element={<Auth login={login} />}></Route>
                    <Route path='/' element={<NotLoggedIn/>}></Route>
                    <Route path='*' element={<NotLoggedIn/>}></Route>
                    
                    
                </Routes>
                    
                </BrowserRouter>
            </MantineProvider>
        </authContext.Provider>
        
        
    )
}

export default App
