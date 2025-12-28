import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css';
import { Link } from 'react-router-dom';

const Posts = () => {
  const email = localStorage.getItem('email');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/home/posts?email=${email}`);
        setPosts(res.data.results);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <h2 className="text-center mt-5 " style={{height:'100vh',width:'100vw'}}>No posts...!</h2>
      ) : (
        <div className="container my-5">
          <h2 className="mb-4 text-center">📚 My Posts</h2>
          <div className="row g-4">
            {posts.map((blog, index) => (
              <div className="col-md-6 col-lg-3 " style={{height:'90vh'}} key={index}>
                <div className="card h-100 shadow-sm ">
                  <img
                    src={blog.image_url}
                    className="card-img-top"
                    alt="blog"
                    style={{ height: "max-content", objectFit: 'fill' ,overflow:'hidden'  }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{blog.title || 'Untitled'}</h5>

                    <p className="card-text">
                      {blog.description
                        ? blog.description.length > 100
                          ? blog.description.substring(0, 150) + '...'
                          : blog.description
                        : 'No description provided.'}
                    </p>

                    <Link
                      to={`/posts/${blog.id}`}
                      target="_blank"
                      className="btn btn-primary mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
