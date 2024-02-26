import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Groups = ({groups}) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8">Groups</h1>
        <div className="grid grid-cols-3 gap-4">
            {groups.map((group) => (
                <div onClick={() => navigate(`/group/${group.code}`)} key={group.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{group.name}</h2>
                    <p>{group.description}</p>
                </div>
            ))}
        </div>
    </div>
  );
            };
export default Groups