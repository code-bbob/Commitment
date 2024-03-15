import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import dayjs from 'dayjs'
import { useState } from 'react'

const baseURL = 'http://127.0.0.1:8000'


const useAxios = () => {
    let [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') )
    let [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'))
    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${accessToken}`},
    });


    axiosInstance.interceptors.request.use(async req => {
        

        console.log(localStorage.getItem('accessToken'));
        const user = jwtDecode(accessToken);
        console.log(user)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (isExpired) {
            console.log("###########expired")
        }
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/userauth/refresh-token/`, {
            refresh: refreshToken
          });
    
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        localStorage.setItem('accessTokens',response.data.access)
        setAccessToken(response.data.access)
        return req
    })
    
    return axiosInstance
}

export default useAxios;