import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material"
import React, { useState,useEffect } from "react"
import './index.css'
import Cookies from 'js-cookie';

import { createUser } from "../../apiRequest/signup"

const SignUp = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onChangeUserName=(e:any)=>{
        setUserName(e.target.value)
        
    }
    const onChangeEmail=(e:any)=>{
        setEmail(e.target.value)
        
    }
    const onChangephoneNumber=(e:any)=>{
        setPhoneNumber(e.target.value)
        
    }
    const onChangepassword=(e:any)=>{
        setPassword(e.target.value)
        
    }
    const onChangeconfirmPassword=(e:any)=>{
        setConfirmPassword(e.target.value)
        
    }

    const submit = async()=>{
        const object = {
            user_name: userName,
            email: email,
            phone_number: phoneNumber,
            password: password,
        }
    const response = await createUser(object)
    console.log(response)



    }

    useEffect(()=>{
        getData()
      },[])
    
        const getData = async() => {
            const token= Cookies.get("jwt_token")
            if(token){
           
                window.location.replace("/login")
    
            console.log("sathish")
    
            }
        
            }
    


  
    return (
        <div>
            <div className="signupfrom">
            <h1>signup From</h1>

                userName:
            <input type="text" placeholder="enter userName" onChange={onChangeUserName}/>
            email:
            <input type="text" placeholder="enter email" onChange={onChangeEmail}/>
            phoneNumber:
            <input type="text" placeholder="enter phoneNumber" onChange={onChangephoneNumber}/>
            password:
            <input type="password" placeholder="enter password" onChange={onChangepassword}/>
            confrom-password:
            <input type="text" placeholder="enter confirmPassword" onChange={onChangeconfirmPassword}/>
            <button onClick={submit}>submit</button>
            
            </div>




        </div>
    )}
export default SignUp