import React, { useState, useEffect } from 'react';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(post.likes);
  }, [post.likes]);

  const handleLike = () => {
    if (!liked){
    setLikes(likes + 1);
    setLiked(true);
    }
    else {
        setLikes(likes-1);
        setLiked(false);
    }
    // You can also make an API call here to update the backend
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like</button>
      <span>{likes} Likes</span>
    </div>
  );
};

const Bibhab = () => {
  const posts = [
    { id: 1, title: 'Post 1', content: 'Content 1', likes: 0 },
    { id: 2, title: 'Post 2', content: 'Content 2', likes: 0 },
    { id: 3, title: 'Post 3', content: 'Content 3', likes: 0 },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Bibhab;