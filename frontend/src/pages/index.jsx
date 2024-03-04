import React, { useState , useEffect } from "react";
import Heatmap from "../components/Heatmap";
import axios from "axios";
import { SayHi } from "./sayhi";
import Navbar from "../components/navbar";
import Groups from "../components/groups";

export const Index = () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("index", accessToken);
    const refreshToken = localStorage.getItem('refreshToken');
    

    const [commit, setCommit] = useState([]);
    const [user, setUser] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function getCommit() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/commit/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCommit(response.data);
                console.log('commitko',response.data);
            } catch (e) {
                console.log("error ayooooooo");
            }   
        }
        getCommit();
        
        async function getGroups() {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/commit/group/", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setGroups(response.data);
                    console.log("group ko",response.data);
                } catch (e) {
                    console.log(e);
                }   
            }
        getGroups();

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
        <Groups groups = {groups} className=""/>
        <h1 className="text-2xl font-bold text-center my-10">Bye {user.name}</h1>
        </>
    )
    };

    