import { Box, Button, Center, Container, Input, PasswordInput, rem, SimpleGrid, Text, TextInput } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../axiosRequests/auth";
import { setMe, setToken } from "../reducers/auth";

function Auth(){
    const [loggedIn, setLoggedIn] = useState(false); 
    const [token, setToken] = useState(window.localStorage.getItem("token")); 
    const [register, setRegister] = useState(false); 
    const [showPassword, setShowPassword] =useState(false); 

    const me = useSelector((state) => state.auth); 
    const dispatch = useDispatch(); 
    useEffect(()=>{
        console.log(me); 
    }, [me]); 


    const [form, setForm] = useState({
        userName : "", 
        password : "", 
        confirmPassword : "",
        usernameError : "", 
        passwordError : "",
        confirmPasswordError : ""
    }); 

    const checkError = ()=>{
        if(form.userName.length === 0){
            setForm({...form, usernameError : "Username must not be empty"}); 
            return false;
        }
        if(form.password.length <=5){
            setForm({...form, passwordError : "Password must have more than 5 characters"}); 
            return false;
        }
        if(register){
            if(form.confirmPassword.length ===0){
                setForm({...form, confirmPasswordError : "Please confirm your password"}); 
                return false; 
            }
            if(form.confirmPassword !== form.password){
                setForm({...form, confirmPasswordError : "Value must be equal to original password"}); 
                return false;
            }
        }
        return true; 
    }
    const updateStore = ({userName, token})=> (dispatch) =>{
        dispatch(setMe(userName)); 
        dispatch(setToken(token)); 
        console.log("dispatched")
    }
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        if(!checkError()){
            return ;
        }
        if(register){
            console.log("register"); 
            try{
                const response = await userRegister(form.userName, form.password); 
                if(response.status==200){
                    setLoggedIn(true); setRegister(true); 
                    setTimeout(() => {
                        console.log("redirecting");
                        window.location.assign("http://localhost:5173/auth")
                    }, 3000);
                    
                }
            }
            catch(error){
                if(error.response.status === 403){
                    setForm({...form, usernameError : "username exists already"}); 
                }
                
            }
        }
        else {
            try {
                const response = await userLogin(form.userName, form.password); 
                console.log(response);  
                if(response.status===200){
                    localStorage.setItem("token", response.data.second); 
                    setLoggedIn(true); setRegister(false); 
                    await updateStore({
                        userName : response.data.first, 
                        token : response.data.second 
                    }); 
                    
                    setTimeout(() => {
                        window.location.assign("/test")
                    }, 3000);
                }   
            } catch (error) {
                console.error(error);
                
                if(error?.response.status === 403){
                    setForm({...form, passwordError : "Incorrect password"})
                }
                else if(error?.response.status === 404){
                    setForm({...form, usernameError : "No such useraname exists"})
                }
            }
        }
        
        
    }
    /*
        return final authentication page
    */
    return(
        <div className="w-screen h-screen place-items-center content-center">
            <div className="w-1/2 h-1/2 p-5 shadow-lg">
                {loggedIn && (
                    register ? (
                        <div>
                            <p className="text-lg text-black">Congratulations! you were registered. Please wait while we redirect you back to login ...</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg text-black">Congratulations! you have logged in. Please wait while we redirect you to the home page...</p>
                        </div>
                    )
                )}                

                {!loggedIn && (
                    <div className="grid grid-cols-2">
                        <div className={` ${!register ?"bg-green-500 text-white" : "bg-green-200"} text-center hover:cursor-pointer p-2`}
                        onClick={(e) => setRegister(false)}>
                            Login
                        </div>
                        <div className={`${register? "bg-green-500 text-white" : "bg-green-200 "} text-center hover:cursor-pointer p-2`}
                            onClick={(e) => setRegister(true)}
                        >
                            Register
                        </div>

                        <div className="col-span-2 mt-5">
                            
                            <TextInput placeholder="Your username" className={``} 
                                onChange={(e) => setForm({...form, 
                                    userName : e.target.value, 
                                    usernameError : "", 
                                    passwordError : "", 
                                    confirmPassword : ""
                                })}
                                error={`${form.usernameError}`}
                            ></TextInput>
                            <PasswordInput
                                placeholder="Your password"
                                className="mt-2"
                                error={`${form.passwordError}`}
                                onChange={(e)=> setForm({...form, 
                                    password : e.target.value, 
                                    usernameError : "", 
                                    passwordError : "", 
                                    confirmPassword : ""
                                })}

                            ></PasswordInput>
                            {register && (
                                <PasswordInput
                                    placeholder="Confirm password"
                                    className="mt-2"
                                    error={`${form.confirmPasswordError}`}
                                    onChange={(e)=> setForm({...form, 
                                        confirmPassword : e.target.value, 
                                        usernameError : "", 
                                        passwordError : "", 
                                        confirmPasswordError : ""
                                    })}
                                ></PasswordInput>
                            )}
                            <Button variant="filled" w={`100%`} className="mt-5"
                                disabled={form.userName.trim()==="" || form.password.trim()===""}
                                onClick={handleSubmit}
                            >
                                {register ?"Register" : "Login"}
                            </Button>
                        </div>



                    </div>
                )}
            </div>
        </div>
    )
}

export default Auth; 