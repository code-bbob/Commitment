import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';
import useAxios from '../utils/useAxios';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('api/commit/group/');
        console.log('Groups', response.data[0]);
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
      {groups.map((group) => (
        <div key={group?.id} onClick={() => navigate(`/group/${group?.code}`)}  >
          <Card className="mx-80 my-10 w-1/2">
            <CardHeader>
            <CardTitle>{group?.name}</CardTitle>
            <div className="border-t border-black mx-0"></div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Groups;
