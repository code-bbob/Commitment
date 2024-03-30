import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '../components/ui/card';
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
        <div className="flex flex-wrap">
      {groups.length>0?groups.map((group) => (
        <div className='m-8 w-[350px]' key={group?.id} onClick={() => navigate(`/group/${group?.code}`)}  >
          <Card className="h-72 hover:bg-gray-300">
            <CardHeader className="pb-4 mb-4 bg-black rounded-xl">
            <CardTitle className="mb-4 font-serif text-2xl text-white">{group?.name}</CardTitle>
            <img
            src={`http://127.0.0.1:8000/${group?.dp}`}
            alt=""
            className="absolute object-cover h-36 w-36 rounded-full ml-[180px]"
          />
            <div className="border-t-2 border-white mx-0"/>
            </CardHeader>
            <CardContent className="pb-4 h-24 w-[230px]">
              <CardDescription>
              Group description bibhab bi
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between pb-4">
              <p className="italic"> Members Joined: 10</p>
              <div>

              <p className="font-bold text-5xl"> {group?.streak}</p>
              days streak
              </div>
            </CardFooter>
          </Card>
        </div>
      )):<h1>No groups</h1>}
    </div>
    </div>
  );
};

export default Groups;
