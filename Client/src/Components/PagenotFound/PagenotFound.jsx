// src/pages/NotFound.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <a href="/" className="btn btn-primary">Go to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
