import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';
import Groups from "../components/groups";
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const api = useAxios();


  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('api/commit/');
        setCommits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommits();
  }, []);
  

  return (
    <div>
        <Navbar/>
        <div className="flex flex-row ">
        
        {/* left group */}
        <div>
        <Groups/>
        </div>
        {/* line */}
        <div className="sticky top-0 h-screen w-[0.5px] bg-black mx-7"></div>

      <div className="my-5 flex flex-col items-center">
      {commits.map((commit) => (
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
    </div>
    </div>
  );
};

export default Commits;
