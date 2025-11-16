import { Box, Button, Center, Container, Input, PasswordInput, rem, SimpleGrid, Text, TextInput } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Auth(){
    const [loggedIn, setLoggedIn] = useState(false); 
    const [token, setToken] = useState(window.localStorage.getItem("token")); 
    const [register, setRegister] = useState(false); 
    const [showPassword, setShowPassword] =useState(false); 

    const me = useSelector((state) => state.auth.userName); 
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
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        if(!checkError()){
            return ;
        }
        if(register){
            console.log("register"); 
            try{
                const response = await axios.post("http://localhost:8080/api/user/register", {
                    userName : form.userName,
                    password : form.password
                }); 
            }
            catch(error){
                if(error.response.status === 403){
                    setForm({...form, usernameError : "username exists already"}); 
                }
                
            }
        }
        else {
            try {
                const response = await axios.post("http://localhost:8080/api/user/login", {
                    userName : form.userName, 
                    password : form.password
                }); 
                console.log(response.data)    
            } catch (error) {
                if(error.response.status === 403){
                    setForm({...form, passwordError : "Incorrect password"})
                }
                else if(error.response.status === 404){
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
                {loggedIn && <div>
                    <p>You have been logged in, you should be redirected to the home page</p>
                </div>}                

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