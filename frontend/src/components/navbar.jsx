import React from 'react';

const Navbar = ({user}) => {
  return (
    <nav className="bg-black py-5 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Your Logo</div>
        <p className='text-white'>Welcome, {user?.name}! Lets rock it today!</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">Commits</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">Groups</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">Profile</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;
