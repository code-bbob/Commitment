// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
//   const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/api/userauth/refresh-token', {
//           refreshToken: refreshToken
//         });
//         const newAccessToken = response.data.accessToken;
//         setAccessToken(newAccessToken);
//         localStorage.setItem('accessToken', newAccessToken);
//       } catch (error) {
//         console.error('Failed to refresh access token: ', error);
//         // Handle token refresh failure, e.g., redirect to login page
//       }
//     };

//     refreshToken();
//   }, [refreshToken]);

//   return (
//     <div>
//       <h1>React JWT Auth Example</h1>
//       {accessToken ? (
//         <p>Access Token: {accessToken}</p>
//       ) : (
//         <p>Access Token Expired, please login again.</p>
//       )}
//     </div>
//   );
// };

// export default App;
