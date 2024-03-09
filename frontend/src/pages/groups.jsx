import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchGroups = async () => {
      console.log(accessToken);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/commit/group/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
