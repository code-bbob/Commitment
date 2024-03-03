import React, { useState } from 'react';
import axios from 'axios';

const CommitForm = () => {

    const accessToken = localStorage.getItem('accessToken');
    console.log("index", accessToken);
    const refreshToken = localStorage.getItem('refreshToken');
    
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/commit/', formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
      console.log(response.data); // handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        name="content"
        value={formData.field1}
        onChange={handleChange}
      />

      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        value={formData.field2}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CommitForm;
