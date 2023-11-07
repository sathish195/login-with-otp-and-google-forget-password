import axios from 'axios'
import Cookies from 'js-cookie';

export const createUser = async (data: any) => {
    const token = Cookies.get('jwt_token')

    const reqData = JSON.stringify(data)

    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/api/v1/auth/signup`,
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
