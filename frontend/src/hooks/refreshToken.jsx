import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const  useRefreshToken = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
  const navigate = useNavigate();

    const refresh = async () => {
        console.log('refreshing token....................');
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/userauth/refresh-token/', {
          refresh: refreshToken
        });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        await new Promise((resolve) => {
          localStorage.setItem('accessToken', newAccessToken);
          setAccessToken(newAccessToken);
          resolve();
      });
        console.log("setting access token.....",newAccessToken);
      } catch (error) {
        // Handle token refresh failure, e.g., redirect to login page
        if (error.response && error.response.status === 401){
            console.log("redirecting to login ..............");
            navigate("/login");
        }
      }
    };


  return {refresh,accessToken,refreshToken};
};

export default useRefreshToken;
