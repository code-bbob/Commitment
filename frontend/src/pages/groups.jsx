import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';
import useAxios from '../utils/useAxios';
import JoinGroup from '../components/joingroup';
import CreateGroup from '../components/creategroup';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('api/commit/group/');
        console.log('Groups', response.data);
        setGroups(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
        <Navbar/>
        <JoinGroup/>
        <CreateGroup/>
      {groups.length>0?groups.map((group) => (
        <div key={group?.id} onClick={() => navigate(`/group/${group?.code}`)}  >
          <Card className="relative z-[-1] mx-80 my-10 w-1/3 h-60">
            <CardHeader>
            <CardTitle className="mb-4">{group?.name}</CardTitle>
            <img
            src={`http://127.0.0.1:8000/${group?.dp}`}
            alt=""
            className="absolute object-cover h-24 w-24 rounded-full ml-[290px]"
          />
            <div className="border-t-2 border-black mx-0"/>
            </CardHeader>
            <CardContent>
              Group description bla bla bla bla bla bla bla blaaaaa Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptates commodi quo, ut ea accusantium maiores laboriosam, 
            </CardContent>
          </Card>
        </div>
      )):<h1>No groups</h1>}
    </div>
  );
};

export default Groups;
