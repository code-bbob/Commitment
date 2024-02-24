import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Groups = ({groups}) => {

console.log(groups);

  return (
    <>
    <p>Hi {groups?.name}</p>
    </>
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-2xl font-bold mb-4">My Groups</h1>

      
    //     <ul className="list-disc space-y-4">
    //       {groups.map((group) => (
    //         <li key={group.id} className="flex items-center">
    //           {/* <div className="mr-4">
    //             {group.avatar && ( // Display group avatar if available
    //               <img
    //                 src={group.avatar}
    //                 alt={group.name}
    //                 className="w-12 h-12 rounded-full border border-gray-200"
    //               />
    //             )}
    //           </div> */}
    //           <div className="flex-grow">
    //             <a href={group.url || `#/groups/${group.id}`} className="text-blue-500 hover:underline">
    //               {group.name}
    //             </a>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
      
    // </div>
  );
};


export default Groups