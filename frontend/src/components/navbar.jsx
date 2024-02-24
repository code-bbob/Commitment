import React from 'react';

const Navbar = ({user}) => {

  const handleLogout = () => {
    // Remove tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Redirect or navigate to the login page
    // For example, redirect to the login page
    history.push('/login');
  };
  
  // In your render function, add a button to trigger the logout function

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
            <a href="/login" className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;
