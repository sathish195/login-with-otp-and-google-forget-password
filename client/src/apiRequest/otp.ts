import axios from 'axios'
import Cookies from 'js-cookie';

export const sendOtps = async (data: any) => {
    // const token = Cookies.get('jwt_token')

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/api/v1/otp`,
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

export const verifyOtps = async (data: any) => {
    // const token = Cookies.get('jwt_token')

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/api/v1/otp/verify`,
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