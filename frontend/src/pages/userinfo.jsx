import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import useAxios from '../utils/useAxios';
import Navbar from "../components/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

const UserInfo = () => {
    const params = useParams();
    const userId = params.id
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const api = useAxios();

    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(`api/userauth/info/${userId}`);
                setUser(response.data);
                
            } catch (e) {
                console.log(e);
            }   
        }
        getUser();
        console.log(user);
    },[]);
    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return(
        <>
        <Navbar />
        <div>HI {user?.userinfo?.name}</div>        
        </>

    );

}

export default UserInfo