import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Import nature-themed icons
import { FiArrowLeft, FiShare2, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaPinterest, FaLeaf } from 'react-icons/fa';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/home/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner">
        <FaLeaf className="spinner-icon" />
      </div>
    </div>
  );

  if (!post) return <div className="container text-center mt-5 fs-4">Post not found</div>;

  return (
    <div className="nature-blog-post">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        className="hero-section"
        style={{ backgroundImage: `url(${post.image_url || 'https://source.unsplash.com/random/1600x900/?forest'})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="hero-title">{post.title}</h1>
            <div className="hero-meta">
              <span>By {post.author || post.email}</span>
              <span>•</span>
              <span>{new Date(post.date || new Date()).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="post-content-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="back-button-container"
        >
          <Link to="/home/posts" className="back-button">
            <FiArrowLeft /> Back to Articles
          </Link>
        </motion.div>

        {/* Article Content */}
        <motion.article 
          className="post-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="content-body">
            {post.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            {post.images && post.images.map((img, index) => (
              <motion.div 
                key={index}
                className="inline-image-container"
                whileHover={{ scale: 1.01 }}
              >
                <img 
                  src={img} 
                  alt={`Nature photography supporting content`} 
                  className="inline-image"
                />
                <div className="image-caption">A moment captured in nature</div>
              </motion.div>
            ))}
          </div>

          {/* Share Section */}
          <motion.div 
            className="share-section"
            whileHover={{ scale: 1.02 }}
          >
            <div className="divider">
              <FaLeaf />
              <FaLeaf />
              <FaLeaf />
            </div>
            <h3>Share this article</h3>
            <div className="share-buttons">
              <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="fb-button">
                <FaFacebookF />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="tw-button">
                <FaTwitter />
              </a>
              <a href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${post.image_url}&description=${post.title}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="pin-button">
                <FaPinterest />
              </a>
            </div>
          </motion.div>
        </motion.article>
      </main>

      {/* CSS Styles Included in JS */}
      <style jsx global>{`
        :root {
          --primary-green: #5a8f69;
          --secondary-green: #8fb996;
          --light-green: #d4e6d8;
          --cream: #f8f5f0;
          --brown: #5d4037;
        }

        .nature-blog-post {
          font-family: 'Lora', serif;
          color: #333;
          background-color: var(--cream);
          min-height: 100vh;
        }

        .hero-section {
          height: 70vh;
          max-height: 800px;
          width: 100%;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          background: rgba(0, 0, 0, 0.3);
          padding: 2rem 4rem;
          border-radius: 10px;
          max-width: 90%;
          text-align: center;
          color: white;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }

        .hero-meta {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          margin-top: 1rem;
          opacity: 0.9;
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .post-content-container {
          max-width: 800px;
          margin: -80px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .back-button-container {
          margin-bottom: 2rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-green);
          color: white;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: var(--brown);
          transform: translateX(-5px);
        }

        .post-content {
          background: white;
          border-radius: 10px;
          padding: 3rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .content-body {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #444;
        }

        .content-body p {
          margin-bottom: 1.5rem;
        }

        .inline-image-container {
          margin: 3rem 0;
          text-align: center;
        }

        .inline-image {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border: 15px solid white;
          transition: all 0.3s ease;
        }

        .image-caption {
          margin-top: 0.5rem;
          font-style: italic;
          color: #777;
          font-size: 0.9rem;
        }

        .share-section {
          margin-top: 4rem;
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid #eee;
        }

        .divider {
          color: var(--primary-green);
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .share-buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .share-buttons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .fb-button { background: #4267B2; color: white; }
        .tw-button { background: #1DA1F2; color: white; }
        .pin-button { background: #E60023; color: white; }

        .share-buttons a:hover {
          transform: translateY(-3px) scale(1.1);
        }

        .loading-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: var(--cream);
        }

        .spinner {
          animation: spin 2s linear infinite;
          color: var(--primary-green);
          font-size: 3rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 50vh;
            background-attachment: scroll;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-meta {
            font-size: 0.9rem;
          }
          
          .post-content {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-overlay {
            padding: 1.5rem;
          }
          
          .post-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SinglePost;
