import React from "react";
import { useState, useEffect } from "react";
import useAxios from '../utils/useAxios';

const JoinGroup = () => {
    const api = useAxios();
    const [groupCode, setGroupCode] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    
    const handleJoinGroup = async (e) => {
        e.preventDefault();
        try {
        const response = await api.post('api/commit/group/', { action: "join" , join_code: groupCode });
        console.log(response.data);
        setSuccess(response.data.message);
        } catch (error) {
            console.log(error.response.data)
        setError(error.response.data.message);
        }
    };
    
    return (
        <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold my-5">Join Group</h1>
        <form onSubmit={handleJoinGroup} className="flex flex-col items-center">
            <input
            type="text"
            placeholder="Group Code"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            className="border border-gray-400 rounded-md p-2 w-80 my-2"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 w-80 my-2"
            >
            Join Group
            </button>
            {error && <p className="text-red-500 my-2">{error}</p>}
            {success && <p className="text-green-500 my-2">{success}</p>}
        </form>
        </div>
    );
}
export default JoinGroup;
