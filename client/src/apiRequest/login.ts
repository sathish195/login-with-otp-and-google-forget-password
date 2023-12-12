import axios from 'axios'
import Cookies from 'js-cookie';

export const loginUser = async (data: any) => {
    const token = Cookies.get('jwt_token')

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/api/v1/auth/login`,
            headers: {
                //  'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
            ,
            data: reqData
        });

        const responseData = await response.data;
        return responseData



    } catch (error) {
        return error
    }

}


export const LoginSocial = async (userdata: object) =>{
    const newData = JSON.stringify(userdata);
    try {
        const response = await axios(
            {
                method: "POST",
                url:`http://localhost:3000/api/v1/auth-user/login-social`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error:any) {
        return error.response.data
    }
  }
  
  
  export const ForgotPasswordApi = async (data: object) =>{
    const newData = JSON.stringify(data);
    try {
        const response = await axios(
            {
                method: "POST",
                url:`http://localhost:3000/api/v1/auth/forgot_password`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error
    }
  }
  
  export const VerifyOtpApi = async (data: object) =>{
    const newData = JSON.stringify(data);
    try {
        const response = await axios(
            {
                method: "POST",
                url:`http://localhost:3000/api/v1/auth/verify`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error
    }
  }
  
  
  export const getOtpDetails = async (otp: any) =>{
    try {
        const response = await axios(
            {
                method: "get",
                url:`http://localhost:3000/api/v1/auth/otpdetails/${otp}`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error
    }
  }
  
  export const changePasswordApi = async (data: object) =>{
    const newData = JSON.stringify(data);
    try {
        const response = await axios(
            {
                method: "PATCH",
                url:`http://localhost:3000/api/v1/auth/changepassword`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error
    }
  }