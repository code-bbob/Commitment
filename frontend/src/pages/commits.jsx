import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';
import Groups from "../components/groups";
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { Button } from '../components/ui/button';

const Commits = () => {
  const navigate = useNavigate();
  const [commits, setCommits] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const api = useAxios();

  const handlelike = async (e,commit) =>{
    e.preventDefault();
    e.stopPropagation();
    const response=await api.patch('/api/commit/', { commit_code: commit?.code }).then(response => {
      console.log(response.data);
  }).catch(error => {
      console.error('Error updating bio:', error);
  });
    console.log('like clicked £££££££££££££££££££££££££££')
  }


  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('api/commit/');
        console.log(response.data);
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
          <Card onClick={() =>navigate(`/commit/${commit.code}`)}>
            <CardHeader>
            <CardTitle>{commit.title}</CardTitle>
            <div className="border-t border-black"></div>
            <CardDescription>
              <a href={`/user/${commit.user?.uuid}`}>Author: {commit.user.name} </a>
              Likes:{commit?.likes.length}
              <Button onClick={(e) => handlelike(e, commit)}>Click me</Button>
            </CardDescription>
            </CardHeader>
            <CardContent>
              Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rerum neque repellat sit esse voluptate quis adipisci accusantium! Sit culpa odit, incidunt eaque delectus nobis omnis quibusdam dignissimos provident aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam illum inventore voluptatum tenetur officiis, ipsam nam doloremque itaque aliquid, eligendi, alias repellat amet ex. Sunt nulla voluptatum beatae laudantium officia. dolor sit amet consectetur adipisicing elit. Ipsa deleniti voluptas possimus vitae eos? Eveniet corrupti, ipsum dolor eius voluptas perferendis repudiandae maiores sit deleniti, sed similique vero quibusdam ab!{commit.content}</CardContent>
          </Card>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Commits;
