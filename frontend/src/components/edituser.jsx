import React, { useState } from 'react';
import useAxios from '../utils/useAxios';
import { useEffect } from 'react';
const EditUser = () => {
    const api = useAxios();
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/userauth/info/');
                setBio(response.data?.userinfo?.bio);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your logic here to update the user's bio
        const response=await api.patch('/api/userauth/info/', { bio: bio }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('Error updating bio:', error);
        });
    };

    return (
        <div>
            <h2>Edit User Bio</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" value={bio} onChange={handleBioChange} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditUser;