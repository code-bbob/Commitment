import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import useAxios from '../utils/useAxios';
const SingleCommit = () => {
    const params = useParams();
    const commitCode = params.id
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const api = useAxios()

    const [commit, setCommit] = useState([]);

    useEffect(() => {
        async function getCommit() {
            try {
                const response = await api.get(`api/commit/${commitCode}`);
                setCommit(response.data);
                
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
        <Card className="mx-80 my-10 w-1/2">
            <CardHeader>
            <CardTitle>{commit.title}</CardTitle>
            <div className="border-t border-black mx-0"></div>
            <CardDescription>Author: <a href= {`/user/${commit.user?.uuid}`}>{commit.user?.name} </a></CardDescription>
            </CardHeader>
            <CardContent>Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rerum neque repellat sit esse voluptate quis adipisci accusantium! Sit culpa odit, incidunt eaque delectus nobis omnis quibusdam dignissimos provident aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam illum inventore voluptatum tenetur officiis, ipsam nam doloremque itaque aliquid, eligendi, alias repellat amet ex. Sunt nulla voluptatum beatae laudantium officia. dolor sit amet consectetur adipisicing elit. Ipsa deleniti voluptas possimus vitae eos? Eveniet corrupti, ipsum dolor eius voluptas perferendis repudiandae maiores sit deleniti, sed similique vero quibusdam ab!{commit.content}</CardContent>
          </Card>
        </>

    );

}

export default SingleCommit