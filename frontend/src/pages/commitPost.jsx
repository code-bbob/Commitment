import React, { useState } from 'react';
import axios from 'axios';
import useAxios from '../utils/useAxios';
import { Card, CardContent, CardHeader,CardFooter,CardTitle,CardDescription} from '../components/ui/card';
import Navbar from '../components/navbar';

const CommitForm = () => {

    const api = useAxios();
    
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
      const response = await api.post('api/commit/', formData);
      console.log(response.data); // handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-rose-500 to-teal-200 h-screen'>
      <Navbar />
    <form onSubmit={handleSubmit}>
      <Card className=" bg-black text-white mx-80 my-10 w-1/2 h-[60vh]">
            <CardHeader>
            <CardTitle><label htmlFor="title">Title:</label>
      <input
      className='bg-black'
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      /></CardTitle>
            <div className="border-t border-white"></div>
            <CardDescription className="text-white">
            <label htmlFor="type">Type:</label>
      <input
      className='bg-black'
        type="text"
        id="type"
        name="type"
        value={formData.field2}
        onChange={handleChange}
      />
                    </CardDescription>
            </CardHeader>
            <CardContent>
            <label htmlFor="content">Content:</label>
      <input
      className='bg-black'
        type="text"
        id="content"
        name="content"
        value={formData.field1}
        onChange={handleChange}
      />
              </CardContent>
              <CardFooter>
              <button className='border-white border px-3' type="submit">Submit</button>
              </CardFooter>
          </Card>

    </form>
    </div>
  );
};

export default CommitForm;
