import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/commit/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
      {commits.map((commit) => (
        <div key={commit.id} >
          <Card className="mx-80 my-10 w-1/2">
            <CardHeader>
            <CardTitle>{commit.title}</CardTitle>
            <div className="border-t border-black mx-0"></div>
            <CardDescription>Author: {commit.user.name}</CardDescription>
            </CardHeader>
            <CardContent>Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rerum neque repellat sit esse voluptate quis adipisci accusantium! Sit culpa odit, incidunt eaque delectus nobis omnis quibusdam dignissimos provident aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam illum inventore voluptatum tenetur officiis, ipsam nam doloremque itaque aliquid, eligendi, alias repellat amet ex. Sunt nulla voluptatum beatae laudantium officia. dolor sit amet consectetur adipisicing elit. Ipsa deleniti voluptas possimus vitae eos? Eveniet corrupti, ipsum dolor eius voluptas perferendis repudiandae maiores sit deleniti, sed similique vero quibusdam ab!{commit.content}</CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Commits;
