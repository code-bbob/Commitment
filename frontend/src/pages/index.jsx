import React, { useState, useEffect } from "react";
import Heatmap from "../components/Heatmap";
import axios from "axios";
import Navbar from "../components/navbar";
import Groups from "../components/groups";
import useAxios from "../utils/useAxios";

export const Index = () => {
    const [commit, setCommit] = useState([]);
    const [user, setUser] = useState([]);
    const [groups, setGroups] = useState([]);
    const api = useAxios();

    useEffect(() => {
        async function fetchData() {
            try {
                const [commitResponse, groupsResponse, userResponse] = await Promise.all([
                    api.get("api/commit/"),
                    api.get("api/commit/group/"),
                    api.get(`api/userauth/info/`)
                ]);
                setCommit(commitResponse.data);
                setGroups(groupsResponse.data);
                setUser(userResponse.data);
            } catch (error) { }
        }

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1 className="text-2xl font-bold text-center my-10">Hi {user?.name}</h1>
            <Heatmap data={commit} />
            <Groups groups={groups} className="" />
            <h1 className="text-2xl font-bold text-center my-10">Bye {user.name}</h1>
        </>
    );
};

export default Index;


//problem is after token expired each one calls the refresh token so it is refreshed many times