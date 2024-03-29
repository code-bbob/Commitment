import React from 'react';
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/accessSlice";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());

    // Redirect or navigate to the login page
    // For example, redirect to the login page
    history.push('/login');
  };
  
  // In your render function, add a button to trigger the logout function

  return (
    <nav className="z-[100] bg-black py-5 px-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">DearDiary</div>
        {/* { user?(
        <p className='text-white'>Welcome, {}! Lets rock it today!</p>
        ):
        (
          <p className='text-white'>Hey there! Hope you are doing great!</p>
        )
      } */}
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/commits" className="text-white hover:text-gray-300">Commits</a>
          </li>
          <li>
            <a href="/groups" className="text-white hover:text-gray-300">Groups</a>
          </li>
          <li>
            <a href={`/user/`} className="text-white hover:text-gray-300">Profile</a>
          </li>
          <li>
            <a href="/login" className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;
