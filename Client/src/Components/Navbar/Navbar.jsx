import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Assests from '../../assets/Assests.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ home, setHome }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const profile_pic = localStorage.getItem('profilePic');
  const email = localStorage.getItem('email');
  const user = localStorage.getItem('user') || 'U';
  const letter = user.toUpperCase()[0];
  const total_users = localStorage.getItem('total-users') || 0;

  // Image preview effect
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const Homeclick = () => {
    setHome((prev) => {
      const newHome = !prev;
      navigate(newHome ? '/Home' : '/Home/posts');
      return newHome;
    });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert('Please fill in the title and select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('image', image);
      formData.append('title', title);
      formData.append('description', desc);

      const response = await fetch('http://localhost:3000/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert('Blog created successfully!');
        setTitle('');
        setDesc('');
        setImage(null);
        setShowModal(false);
      } else {
        alert(`Failed: ${result.msg}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error creating blog');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
          <a className="navbar-brand d-flex align-items-center mb-2 mb-lg-0" href="#">
            <img
              src={'src/Components/Navbar/BlogPic.png'}
              alt="blogger_logo"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              className="me-2 rounded"
            />
            <span className="fw-bold d-none d-sm-block">MyBlog</span>
          </a>

          <div className="d-flex align-items-center gap-3 mb-2 mb-lg-0">
            <input
              type="button"
              className="btn btn-light fw-bold d-none d-sm-block"
              value={`Total Users : ${total_users}`}
              readOnly
            />
            <button
              type="button"
              className="btn btn-light fw-bold d-none d-sm-block"
              onClick={Homeclick}
            >
              My Posts
            </button>
            <button
              type="button"
              className="btn btn-light fw-bold"
              onClick={() => setShowModal(true)}
            >
              + Create Blog
            </button>
            <a href="/myprofile">
              <img
                src={profile_pic || Assests[letter]}
                alt="profile"
                className="rounded-circle"
                style={{
                  width: '50px',
                  height: '50px',
                  border: '2px solid white',
                  objectFit: 'cover',
                }}
              />
            </a>

            <button
              type="button"
              className="btn btn-danger fw-bold d-none d-sm-block"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="btn btn-danger fw-bold d-block d-sm-none"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt fs-5"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-card p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <div className="d-flex justify-content-end">
              <button className="btn-close-custom" onClick={() => setShowModal(false)}>
                ✖
              </button>
            </div>
            <h2 className="text-center mb-4">Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  maxLength={100}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Max 800 characters"
                  rows="4"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  maxLength={800}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label fw-semibold">
                  Upload Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="imageUpload"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
              {preview && (
                <div className="text-center mb-3">
                  <img
                    src={preview}
                    alt="preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Create Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
