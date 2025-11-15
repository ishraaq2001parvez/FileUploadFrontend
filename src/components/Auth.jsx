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


    const handleSubmit = async (e) =>{
        if(register){
            console.log("register")
        }
        else{
            const response = await axios.post("http://localhost:8080/api/user/login", {
                userName : form.userName, 
                password : form.password
            }); 
            console.log(response); 
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
                                onChange={(e) => setForm({...form, userName : e.target.value})}
                                error={`${form.usernameError}`}
                            ></TextInput>
                            <PasswordInput
                                placeholder="Your password"
                                className="mt-2"
                                error={`${form.passwordError}`}
                                onChange={(e)=> setForm({...form, password : e.target.value})}

                            ></PasswordInput>
                            {register && (
                                <PasswordInput
                                    placeholder="Confirm password"
                                    className="mt-2"
                                    error={`${form.confirmPasswordError}`}
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