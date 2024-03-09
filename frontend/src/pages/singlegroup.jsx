import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar";
import { GroupMembers } from "../components/groupmembers";
import { GroupCode } from "../components/groupcode";
import { useNavigate } from "react-router-dom";
import { Card } from '../components/ui/card';
import { CardHeader, CardDescription, CardTitle, CardContent } from '../components/ui/card';

const SingleGroup = () => {
    const params = useParams();
    const groupCode = params.id;
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const [group, setGroup] = useState([]);

    useEffect(() => {
        async function getGroup() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/commit/group/${groupCode}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setGroup(response.data);
                console.log('Group single ko',response.data.user);
            } catch (e) {
                console.log(e);
            }   
        }
        getGroup();
        console.log("bibhab",group);

    },[]);
    // This is a single group page that contains the name of the group, list of users it has on the side and the commits made in that group.
    
    return (
      <>
        <Navbar />
        <div className="flex flex-row w-screen">
        
        {/* left group */}
        <div className="">
        <GroupCode group={group} />
          <GroupMembers users={group.user} />
        </div>

        <div className="sticky top-0 h-screen w-1 bg-black mx-7"></div>
        {/* right group */}
          <div className="my-5 flex flex-col items-center gap-5">
             {group.commit?.map((commit) => (
              <div key={commit.id} className="w-auto max-w-[80%]">
                <Card>
                  <CardHeader>
                    <CardTitle>{commit.title}</CardTitle>
                    <div className="border-t border-black relative"></div>
                    <CardDescription>
                      <a href={`/user/${commit.user?.uuid}`}>Author: {commit.user.name}</a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    Lorem Lorem Lorem ipsum Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Eligendi, rerum neque repellat
                    sit esse voluptate quis adipisci accusantium! Sit culpa
                    odit, incidunt eaque delectus nobis omnis quibusdam
                    dignissimos provident aliquam! Lorem ipsum dolor sit amet
                    consectetur, provident aliquam! Lorem ipsum dolor sit amet
                    consectetur, provident aliquam! Lorem ipsum dolor sit amet
                    consectetur, provident aliquam! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Ipsa deleniti voluptas
                    possimus vitae eos? Eveniet corrupti, ipsum dolor eius
                    voluptas perferendis repudiandae maiores sit deleniti, sed
                    similique vero quibusdam ab!
                    {commit.content}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </>
    );

}

export default SingleGroup