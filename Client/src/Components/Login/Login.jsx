import React, { useState, useEffect } from "react";
import "./Login.css";
import API from "../../Utils/api.js";
import { useNavigate } from "react-router-dom";
import FireBase from "../Firebase/FireBase.jsx";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => {
    setLogin(!login);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        // Login Request
        const res = await API.post("/login", {
          email: formData.email,
          password: formData.password,
        });
        // Save token to localStorage
        localStorage.setItem("email", formData.email);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.username);
        localStorage.setItem("total-users", res.data.total_users);
        localStorage.setItem("profilePic", res.data.profile_URL);
        alert("Login successful!");
        navigate("/home");
      } else {
        // Register Request
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await API.post("/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        alert("Registered successfully!");
        setLogin(true); // Switch to login after register
        // Gmail Api call
        const Gmail = await fetch("http://localhost:3000/api/gmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gmail: formData.email,
            Username: formData.username,
          }),
        });

        const response = await Gmail.json(); // if your API returns JSON

      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container" style={{ maxWidth: "500px" }}>
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h3>{login ? "Login" : "Register"}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {!login && (
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    maxLength={20}
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control fw-bold"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={30}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  maxLength={20}
                />
              </div>

              {!login && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    maxLength={20}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                {login ? "Login" : "Register"}
              </button>
            </form>
          </div>
          <div className="card-footer text-center">
            {login ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={toggleMode}
                >
                  Register here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={toggleMode}
                >
                  Login here
                </span>
              </p>
            )}
            <center>{<FireBase />}</center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
