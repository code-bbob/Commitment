import React from "react";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "../components/ui/card";

const CreateGroup = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [groupname, setGroupname] = useState("");
  const api = useAxios();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/commit/group/", {
        action: "create",
        name: groupname,
      });
      console.log(response.data);
      setSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <Card className="w-[360px] h-[330px] m-10">
        <CardHeader>
          <CardTitle>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold my-5">Create Group</h1>
            </div>
          </CardTitle>
          <div className="border-t border-black mx-0"/>
        </CardHeader>
        <CardContent className="mt-4">
          <form
            onSubmit={handleCreateGroup}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="Group Name"
              value={groupname}
              onChange={(e) => setGroupname(e.target.value)}
              className="border border-gray-400 rounded-md p-2 w-80 my-2"
            />
            <button
              type="submit"
              className="bg-black text-white rounded-md p-2 w-80 mt-4 my-2"
            >
              Create Group
            </button>
            {error && <p className="text-red-500 my-2">{error}</p>}
            {success && <p className="text-green-500 my-2">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateGroup;
