import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar";
import { GroupMembers } from "../components/groupmembers";
import { GroupCode } from "../components/groupcode";

const SingleGroup = () => {
    const params = useParams();
    const groupCode = params.id
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const [group, setGroup] = useState([]);

    useEffect(() => {
        async function getGroup() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/commit/group/${groupCode}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setGroup(response.data);
                console.log('Group single ko',response.data.user);
            } catch (e) {
                console.log(e);
            }   
        }
        getGroup();
        console.log("asdasdasd",group.user);

    },[]);
    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return(
        <>
        <Navbar />
        <GroupMembers users = {group.user}/>
        <GroupCode group={group} />
        <div className="grid grid-cols-3 gap-4">
            {group.commit?.map((c) => (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{c.title}</h2>
                    <p>{c?.content}</p>
                    <p>{c.date}</p>
                </div>
            )
            )}
            </div>
        </>

    );

}

export default SingleGroup