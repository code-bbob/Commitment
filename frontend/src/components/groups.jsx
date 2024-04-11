import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardDescription, CardTitle, CardContent,CardFooter } from '../components/ui/card';
import useAxios from '../utils/useAxios';
import { ScrollArea } from "./ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

const Groups = () => {
  const navigate = useNavigate();
  const [groups, SetGroups] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const api = useAxios();
  

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('api/commit/group/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        SetGroups(response.data);
      } catch (error) {
        console.error("error ayi ni ta",error);
      }
    };

    fetchGroups();
    
  }, []);


  return (
    <>
    <ScrollArea className="h-[90vh] ">
    <h1 className="text-l font-bold mx-4 my-4 text-white">Groups</h1>
      {groups.length>0?groups.map((group) => (
        <TooltipProvider delayDuration={100}>
          <div className='hover:bg-gray-500'>
        <Tooltip className="transition delay-3000">
          <TooltipTrigger><div className='w-24 transform transition-transform hover:scale-110 ' key={group?.id} onClick={() => navigate(`/group/${group?.code}`)}  >
            <img
            src={`http://127.0.0.1:8000/${group?.dp}`}
            alt=""
            className="h-16 w-16 rounded-full mx-4 my-2"
          />
        </div>
     </TooltipTrigger>
          <TooltipContent>
            <p>{group?.name}</p>
          </TooltipContent>
        </Tooltip>
        </div>
      </TooltipProvider>
         )):<h1>No groups</h1>}
      </ScrollArea>
    </>

  )
            };
export default Groups