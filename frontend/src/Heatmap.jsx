// import React from 'react'
// import ActivityCalendar from 'react-activity-calendar'
// import axios from 'axios'
// import { useEffect, useState } from 'react'


// const Heatmap = () => {
    

//     const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTE5MzAxLCJpYXQiOjE3MDg0MzI5MDEsImp0aSI6IjBkZjYxMWVjNmUzMTQyYmFhYjM0Y2I3YmY5Zjk4NWIyIiwidXNlcl9pZCI6MX0.34I8rxV7By1b3JCWKD-qnWNwRMVnIzBFjy0qV33dBBw"

//     const [commit, setCommit] = useState([])

//     axios.interceptors.request.use(
//       (config) => {
//         if (accessToken) {
//           config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );
  

//     useEffect(() => {
//       async function getCommit(){
//         try {
//             const commit = await axios.get("http://127.0.0.1:8000/api/commit/")
//             setCommit(commit.data)
//       }
//       catch (e){
//         console.log(e)
//       }
//     } 
//     getCommit()
//     },[])
    
//     console.log(commit.data)
//     const data = [
//         // {   "stb": "bibhab",
//         //     "date": "2024-01-01",
//         //     "count": 50,
//         //     "level": 4
//         // },
//         // {
//         //     "user": {
//         //         "id": 1,
//         //         "name": "Bibhab Basnet",
//         //         "email": "bbobbasnet@gmail.com"
//         //     },
//         //     "type": "Personal",
//         //     "title": "Bibhab the great",
//         //     "content": "Bibhab is the great",
//         //     "date": "2024-02-20",
//         //     "level": 4,
//         //     "count": 50

//         // },
//         // {
//         //     "date" : "2024-01-03",
//         //     "count": 10,
//         //     "level": 4
//         // },
//         // {
//         //     "date" : "2025-01-01",
//         //     "count": 10,
//         //     "level": 4
//         // }
//     ]

//     return (
//         <>
//         <ActivityCalendar
//             data={commit?.data}

//             theme ={{
//                 light: ['#0002', 'green'],
//                 dark: ['#0008', 'green'],
//             }}

//             colorscheme='dark'

//             showWeekdayLabels

//             blockSize={15}
//             blockMargin={3}
//         />
//         </>
//     )
// }

// export default Heatmap

import React, { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import axios from 'axios';

const Heatmap = () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTE5MzAxLCJpYXQiOjE3MDg0MzI5MDEsImp0aSI6IjBkZjYxMWVjNmUzMTQyYmFhYjM0Y2I3YmY5Zjk4NWIyIiwidXNlcl9pZCI6MX0.34I8rxV7By1b3JCWKD-qnWNwRMVnIzBFjy0qV33dBBw";

    const [commit, setCommit] = useState([]);

    useEffect(() => {
        async function getCommit() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/commit/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log("dis",response.data)
                setCommit(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }
        getCommit()
    }, []);
    return (
        <>
            <ActivityCalendar
               const data = {commit}                
                theme={{
                    light: ['#0002', 'green'],
                    dark: ['#0008', 'green'],
                }}

                colorscheme='dark'

                showWeekdayLabels

                blockSize={15}
                blockMargin={3}
            />
        </>
    );
};

export default Heatmap;
