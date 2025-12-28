import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BlogCards from '../BlogCards/BlogCards.jsx'
const Home = () => {
  const [home, setHome] = useState(true);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const [search, setSearch] = useState("");
  const username = localStorage.getItem('user');
  const location = useLocation();
  console.log(location.pathname);
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogs');
        const data = await response.json();
        setImagePreviewURL(data.results[0]?.image_url);
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };


    fetchImage();
  }, []);

  return (
    <>
      <Navbar home={home} setHome={setHome} />
      
      <div className="container-fluid py-4 bg-primary text-white text-center">
  <h1>Welcome, {username}...!</h1>
  <div className="container mt-4 d-flex justify-content-center gap-2">
    <input
      type="search"
      className="form-control w-50"
      placeholder="Search blogs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button type="button" className="btn btn-light text-primary fw-bold px-4">
      Search
    </button>
  </div>
</div>

{home ? (
  <div className="container my-5">
    <h2 className="mb-4 text-center">📚 Featured Blogs</h2>
    <div className="row g-4">
      {BlogCards.map((blog, index) => (
        <div className="col-md-6 col-lg-3" key={index}>
          <div className="card h-100 shadow-sm">
            <img src={blog.image} className="card-img-top" alt="blog" />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">
                {blog.text.length > 100 ? `${blog.text.slice(0, 100)}...` : blog.text}
              </p>
              <Link to={`/posts/feeds/${index + 1}`} className="btn btn-primary mt-auto">Read More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <Outlet />
)}

<Footer />

    </>
  );
};

export default Home;
