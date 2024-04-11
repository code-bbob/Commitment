import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Card, CardFooter } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';
import Groups from "../components/groups";
import { useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { Button } from '../components/ui/button';
import { FaHeart } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

const Commits = () => {
  const navigate = useNavigate();
  const [commits, setCommits] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const api = useAxios();


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

  const handleLike = async (e, commit) => {
  try {
    e.preventDefault();
    e.stopPropagation();
    const response = await api.patch('/api/commit/', { commit_code: commit?.code });
    console.log(response.data);

    // Optimistically update the like count
    setCommits((prevCommits) =>
      prevCommits.map((c) =>
        c.code === commit.code ? { ...c, likes: [...c.likes, response.data] } : c
      )
    );
  } catch (error) {
    console.error('Error updating bio:', error);
  }
};

  return (
    <div className='bg-gradient-to-r from-rose-500 to-teal-200'>
        <Navbar/>
        <div className="flex flex-row ">
        
         {/* left group */}
        <div className='bg-black fixed h-screen'>
        <Groups/>
        </div>
        {/* line */}
        <div className="sticky top-0 h-screen w-[0.5px] bg-white ml-24"></div> 

      <div className="my-5 ml-24 flex flex-col items-center ">
      <GiNotebook size={32} className='hover:text-slate-500 hover:scale-125' onClick={()=>navigate("post/")} />
      {commits.map((commit) => (
        <div key={commit.id} className="w-auto max-w-[80%] my-4">
          <Card className=" bg-black text-white" onClick={() =>navigate(`/commit/${commit.code}`)}>
            <CardHeader>
            <CardTitle>{commit.title}</CardTitle>
            <div className="border-t border-white"></div>
            <CardDescription className="text-">
                      <p>Posted on: {commit?.date}</p>
                    </CardDescription>
            </CardHeader>
            <CardContent>
              Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, rerum neque repellat sit esse voluptate quis adipisci accusantium! Sit culpa odit, incidunt eaque delectus nobis omnis quibusdam dignissimos provident aliquam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam illum inventore voluptatum tenetur officiis, ipsam nam doloremque itaque aliquid, eligendi, alias repellat amet ex. Sunt nulla voluptatum beatae laudantium officia. dolor sit amet consectetur adipisicing elit. Ipsa deleniti voluptas possimus vitae eos? Eveniet corrupti, ipsum dolor eius voluptas perferendis repudiandae maiores sit deleniti, sed similique vero quibusdam ab!{commit.content}
              </CardContent>
              <CardFooter><p className='text-xl font-bold mt-8'>{commit?.likes.length}</p>
             
              <FaHeart className='text-red-600 size-4 mt-8 mx-1 hover:scale-125 hover:text-red-800' onClick={(e) => handleLike(e, commit)}/>
              <a href={`/user/${commit.user?.uuid}`} className='font-serif font-medium italic ml-[600px]'>- {commit.user.name}</a>
              </CardFooter>
          </Card>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Commits;
