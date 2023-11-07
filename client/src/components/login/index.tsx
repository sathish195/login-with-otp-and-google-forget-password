import React, { useState,useEffect} from "react"
import { useNavigate  } from 'react-router-dom'

import './index.css'
import { loginUser } from "../../apiRequest/login"
import Cookies from "js-cookie"


const Login = () => {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  

    const onChangeEmail=(e:any)=>{
        setEmail(e.target.value)
        
    }

    const onChangepassword=(e:any)=>{
        setPassword(e.target.value)
        
    }

    const loginsubmit = async() => {
       const login={
        email: email,
        password: password,
        

        }

  
    const response = await loginUser(login)
    if (response.token) {
        onSubmitSuccess(response.token)
        console.log("sucess")
    }
    else {
       console.log("faild")
    }
    console.log(login)
    console.log(response.token)
    console.log(response)
        // on submit success 
        function onSubmitSuccess (jwtToken:string) {
            Cookies.set('jwt_token', jwtToken ,{
                expires: 30,
              })
              window.location.replace('/')
              
            
        } 
    



    }

    useEffect(() => {
        getData()

    

    },[])

    const getData = async() => {
        const token= Cookies.get("jwt_token")
        if(token){
       
            window.location.replace("/")
        }
    
        }


  
    return (
        <div>
            <div className="signupfrom">
            <h1>signup From</h1>

            email:
            <input type="text" placeholder="enter email" onChange={onChangeEmail}/>
            password:
            <input type="password" placeholder="enter password" onChange={onChangepassword}/>
            <button onClick={loginsubmit}>submit</button>
            
            </div>




        </div>
    )}
export default Login