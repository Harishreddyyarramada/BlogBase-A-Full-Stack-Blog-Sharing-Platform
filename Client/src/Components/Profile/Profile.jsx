import React, { useState } from 'react';
import Assests from '../../assets/Assests.js';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('user') || '');
  const [tempFile, setTempFile] = useState(null); // store actual file
  const [preview, setPreview] = useState(null); // for local preview
  const profile_pic = localStorage.getItem('profilePic');
  const email = localStorage.getItem('email') || '';
  const user = localStorage.getItem('user') || '';
  const letter = user ? user[0].toUpperCase() : 'A';

  // Handle save changes (username, password, profile pic)
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // prepare FormData so we can send file + fields
    const formData = new FormData();
    formData.append("email", email);

    // Password case
    if (showPasswordFields) {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (newPassword.trim() !== '') {
        formData.append("password", newPassword);
      }
    }

    // Username case
    const storedUsername = localStorage.getItem('user') || '';
    if (username !== storedUsername) {
      formData.append("username", username);
    }

    // Profile Pic case (file upload)
    if (tempFile) {
      formData.append("profilePic", tempFile);
    }

    try {
      const res = await fetch("http://localhost:3000/api/profile/update", {
        method: "PUT",
        body: formData, // FormData automatically sets multipart/form-data
      });

      const data = await res.json();
      console.log("Profile updated:", data);

      // update profilePic with Cloudinary URL
      if (data.imageUrl) {
        setProfilePic(data.imageUrl);
        localStorage.setItem("profilePic", data.imageUrl); // optional persist
      }

      if (data.username) {
        localStorage.setItem("user", data.username);
      }

      alert("Changes saved!");
      setShowUploadOptions(false);
      setTempFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error saving changes");
    }
  };

  // Image upload handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempFile(file); // keep actual file for backend
      setPreview(URL.createObjectURL(file)); // preview only
    }
  };

  const handleCancelUpload = () => {
    setTempFile(null);
    setPreview(null);
    setShowUploadOptions(false);
  };

  const handleEditClick = () => {
    setTempFile(null);
    setPreview(null);
    setShowUploadOptions(true);
  };

  // Password toggle
  const togglePasswordFields = () => {
    if (showPasswordFields) {
      setNewPassword('');
      setConfirmPassword('');
    }
    setShowPasswordFields((prev) => !prev);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">My Profile</h3>
          <span className="badge bg-warning px-3 py-2">⚪ Active Now</span>
        </div>

        <div className="row g-4 align-items-center">
          {/* Profile Picture */}
          <div className="col-md-4 text-center position-relative">
            <img
              src={preview || profile_pic || Assests[letter]}
              alt="Profile"
              className="rounded-circle img-thumbnail"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            {!showUploadOptions ? (
              <button
                type="button"
                className="btn btn-warning text-white mt-3"
                onClick={handleEditClick}
              >
                <FaEdit className="me-1" /> Edit Profile Picture
              </button>
            ) : (
              <div className="mt-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="d-flex gap-2 mt-2 justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSaveChanges}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleCancelUpload}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="col-md-8">
            <form onSubmit={handleSaveChanges}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="bio" className="form-label">Bio:</label>
                <textarea
                  className="form-control"
                  id="bio"
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Coming Soon ....!"
                  readOnly
                  disabled
                />
              </div>

              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-warning text-white"
                  onClick={togglePasswordFields}
                >
                  {showPasswordFields ? "Cancel Password Change" : "Change Password"}
                </button>
              </div>

              {showPasswordFields && (
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password:</label>
                  <input
                    type="password"
                    className="form-control mb-2"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
