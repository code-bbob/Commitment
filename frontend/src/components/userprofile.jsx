import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

const UserProfile = ({ user }) => {
  console.log(user);
  return (
    <>
      <Card className="h-96 w-96 hover:bg-gray-300">
        <CardHeader className="pb-4 mb-4 bg-black rounded-xl">
          <CardTitle className="mb-4 font-serif text-2xl text-white">
            {user?.userinfo?.name}
          </CardTitle>
          <img
            src={`http://127.0.0.1:8000/${user?.userinfo?.dp}`}
            alt=""
            className="absolute object-cover h-36 w-36 rounded-full ml-[180px]"
          />
          <div className="border-t-2 border-white mx-0" />
        </CardHeader>
        <CardContent className="pb-4 h-24 w-[230px]">
          <CardDescription>{user?.userinfo?.bio}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between pb-4">
          <p className="italic"> Groups Joined: 10</p>
          <div>
            <p className="font-bold text-5xl"> {user?.userinfo?.streak}</p>
            days streak
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserProfile;