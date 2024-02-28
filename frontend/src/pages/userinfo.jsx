import React, { useEffect, useState } from 'react';

const UserInfoPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Fetch user information from the backend here
        // and update the state with the fetched data
        // For example:
        fetch('/api/user')
            .then(response => response.json())
            .then(data => setUserInfo(data));
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={userInfo?.email || ''}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={userInfo?.username || ''}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streak">
                        Streak
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="streak"
                        type="number"
                        placeholder="Enter streak"
                        value={userInfo?.streak || ''}
                        readOnly
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default UserInfoPage;
