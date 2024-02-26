import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

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
                console.log('Group single ko',response.data);
            } catch (e) {
                console.log(e);
            }   
        }
        getGroup();
    },[]);

    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return(
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8">{group.name}</h1>
        <div className="grid grid-cols-3 gap-4">
            {group.user?.map((u) => (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{u.name}</h2>
                    <p>{u.email}</p>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
            {group.commit?.map((c) => (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{c.title}</h2>
                    <p>{c?.content}</p>
                    <p>{c.date}</p>
                </div>
            ))}
            </div>
    </div>

    );

}

export default SingleGroup