import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar";


const SingleCommit = () => {
    const params = useParams();
    const commitCode = params.id
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const [commit, setCommit] = useState([]);

    useEffect(() => {
        async function getCommit() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/commit/${commitCode}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCommit(response.data);
                console.log('Commit single ko',response.data.user);
            } catch (e) {
                console.log(e);
            }   
        }
        getCommit();
        console.log(commit);
    },[]);
    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return(
        <>
        <Navbar />
        <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{commit.title}</h2>
                    <p>{commit.content}</p>
                    <p>{commit.date}</p>
                </div>
        </div>
        </>

    );

}

export default SingleCommit