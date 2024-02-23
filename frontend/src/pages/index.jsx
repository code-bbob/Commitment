import React, { useState , useEffect } from "react";
import Heatmap from "../components/Heatmap";
import axios from "axios";
import { SayHi } from "./sayhi";
import Navbar from "../components/navbar";

export const Index = () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NjY2MTk4LCJpYXQiOjE3MDg1Nzk3OTgsImp0aSI6IjYzMWVhYjFhYTQ5MzRhZjc4YzQyZmU2ZTcxZjIwMzQ1IiwidXNlcl9pZCI6MX0.Q-dCTsZ0S1VOjfpbxUtRckT5d_VPek_j0BxpB0w79jc";

    const [commit, setCommit] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getCommit() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/commit/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCommit(response.data.data);
            } catch (e) {
                console.log(e);
            }   
        }
        getCommit()
        
        async function getUser() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/userauth/info/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUser(response.data);
            } catch (e) {
                console.log("error getting user");
            }   
        }
        getUser()

    }, []);


    return(
        <>
        < Navbar user={user}/>
        <h1 className="text-2xl font-bold text-center my-10">Hi {user.name}</h1>
        <Heatmap data={commit}/>
        <h1 className="text-2xl font-bold text-center my-10">Bye {user.name}</h1>
        </>
    )
    };