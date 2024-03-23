import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import useAxios from '../utils/useAxios';
import Navbar from "../components/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

const UserInfo = () => {
    const params = useParams();
    const userId = params.id
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
    },[]);
    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return(
        <>
        <Navbar />
        <div>HI {user?.userinfo?.name}</div>
        <div className="my-5 flex flex-col items-center">
        {user?.commits?.map((commit) => (
        <div key={commit.id} className="w-auto max-w-[80%] my-4">
            <Card>
            <CardHeader>
            <CardTitle>{commit.title}</CardTitle>
            <div className="border-t border-black"></div>
            <CardDescription>Author: {commit.user.name}</CardDescription>
            </CardHeader>
            <CardContent>Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rerum neque repellat sit esse voluptate quis adipisci accusantium! Sit culpa odit, incidunt eaque delectus nobis omnis quibusdam dignissimos provident aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam illum inventore voluptatum tenetur officiis, ipsam nam doloremque itaque aliquid, eligendi, alias repellat amet ex. Sunt nulla voluptatum beatae laudantium officia. dolor sit amet consectetur adipisicing elit. Ipsa deleniti voluptas possimus vitae eos? Eveniet corrupti, ipsum dolor eius voluptas perferendis repudiandae maiores sit deleniti, sed similique vero quibusdam ab!{commit.content}</CardContent>
            </Card>
        </div>
        ))}
        </div>
        </>

    );

}

export default UserInfo