import React, { useState , useEffect } from "react";
import Heatmap from "../components/Heatmap";
import axios from "axios";
import Navbar from "../components/navbar";
import Groups from "../components/groups";
import useRefreshToken from "../hooks/refreshToken";




export const Index = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const refresh = useRefreshToken();
    
    const [commit, setCommit] = useState([]);
    const [user, setUser] = useState([]);
    const [groups, setGroups] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
        try {
            const commitResponse = await axios.get("http://127.0.0.1:8000/api/commit/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            });
            setCommit(commitResponse.data);
    
            const groupsResponse = await axios.get("http://127.0.0.1:8000/api/commit/group/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            });
            setGroups(groupsResponse.data);
    
            const userResponse = await axios.get(`http://127.0.0.1:8000/api/userauth/info/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            });
            setUser(userResponse.data);
        } catch (error) {
            // Handle errors appropriately
            console.error("Error fetching data:", error);
            if (error.response && error.response.status === 401)
                {
                    console.log("going to refresh");
                    await refresh();
                    console.log("refreshed.................")
                    await fetchData();
                    
                }
        }
        }
    
        fetchData();
    }, []);
    return(
        <>
        < Navbar user={user}/>
        <h1 className="text-2xl font-bold text-center my-10">Hi {user?.name}</h1>
        <Heatmap data={commit}/>
        <Groups groups = {groups} className=""/>
        <button onClick={()=>refresh()}>Refresh</button>
        <h1 className="text-2xl font-bold text-center my-10">Bye {user.name}</h1>
        </>
    )
    };

   