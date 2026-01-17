import { Button, Group, PasswordInput, Stepper, Tabs, TextInput } from "@mantine/core";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { forgotPassword } from "../axiosRequests/auth";

const ForgotPassword = ()=>{
    const [done, setDone] = useState(false); 
    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        userName : "", 
        password : "", 
        confirmPassword : "", 
        userNameError : "", 
        passwordError  : "", 
        confirmPasswordError : ""
    }); 

    // handle submit
    const handleSubmit = async (e)=>{
        e.preventDefault(); 
        if(forgotPasswordForm.confirmPassword !== forgotPasswordForm.password){
            setForgotPasswordForm({...forgotPasswordForm, 
                confirmPasswordError : "Passwords must match"
            }); 
            return ;
        }
        const {data} = await forgotPassword(forgotPasswordForm.userName, forgotPasswordForm.password); 
        // console.log(data)
        if(data.status==="NOT_FOUND"){
            setForgotPasswordForm({...forgotPasswordForm, userNameError : "No such user exists"})
        } else {
            setDone(true); 
            setTimeout(()=>{
                window.location.replace("/auth");
            }, 5000)
        }
    }

    return(
        <div className="w-screen h-screen place-items-center content-center">
            <div className="w-lg min-w-md h-2/3 p-5 shadow-lg">
                {done && (
                    <div>Password updated, please log in with the new password</div>
                )}     
                
                {!done && (
                    <>
                    
                    <div className="text-lg">
                        Forgot Password
                    </div>
                    <div className="mt-5">
                        <TextInput
                            label="Username"
                            description = "Enter Username"
                            error = {forgotPasswordForm.userNameError}
                            onChange={(e)=>{
                                setForgotPasswordForm({...forgotPasswordForm, 
                                    userName : e.target.value, 
                                    userNameError : "", 
                                    passwordError : "", 
                                    confirmPasswordError : ""
                                })
                            }}
                        >
                        </TextInput>
                        <PasswordInput
                            label="Password"
                            description = "Enter New password"
                            error = {forgotPasswordForm.passwordError}
                            onChange={(e)=>{
                                setForgotPasswordForm({...forgotPasswordForm, 
                                    password : e.target.value, 
                                    userNameError : "", 
                                    passwordError : "", 
                                    confirmPasswordError : ""
                                })
                            }}
                        >

                        </PasswordInput>
                        <PasswordInput
                            label = "Confirm Password"
                            description = "Confirm your password"
                            error = {forgotPasswordForm.confirmPasswordError}
                            onChange={(e)=>{
                                setForgotPasswordForm({...forgotPasswordForm, 
                                    confirmPassword : e.target.value, 
                                    userNameError : "", 
                                    passwordError : "", 
                                    confirmPasswordError : ""
                                })
                            }}
                        >

                        </PasswordInput>
                        <Button onClick={handleSubmit} className="mt-5"
                            disabled = {forgotPasswordForm.userName.length === 0 || forgotPasswordForm.password.length <= 5}
                        >
                            Submit
                        </Button>
                    </div>
                    </>
                )}
                
            </div>
        </div>
    )
}; 

export default ForgotPassword ;