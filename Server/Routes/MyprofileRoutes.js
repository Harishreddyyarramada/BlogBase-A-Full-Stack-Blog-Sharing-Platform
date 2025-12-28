const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');  // 🔑 Import bcrypt
const db = require('../Config/db.js');
const { storage, cloudinary } = require('../Config/CloudinaryConfig.js');
const upload = multer({ storage });

// Update profile (username, password, profilePic)
router.put('/update', upload.single('profilePic'), async (req, res) => {
  try {
    const { username, password, email } = req.body; 
    console.log("Update request:", username, password, email);

    let updates = [];
    let values = [];

    // Step 1: Collect text field updates
    if (username) {
      updates.push('username = ?');
      values.push(username);
    }
    if (password) {
      // 🔑 Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10); 
      updates.push('password = ?'); 
      values.push(hashedPassword);
    }

    // Step 2: Handle profile picture if uploaded
    if (req.file) {
      const newImageUrl = req.file.path;
      const newPublicId = req.file.filename;

      // First get old public_id from DB
      const findQuery = 'SELECT public_Id FROM users WHERE email = ?';
      db.query(findQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ msg: 'Error finding user in DB' });
        if (results.length === 0) return res.status(404).json({ msg: 'User not found' });

        const oldPublicId = results[0].public_Id;

        // Delete old profile image from Cloudinary
        if (oldPublicId) {
          cloudinary.uploader.destroy(oldPublicId, (error, result) => {
            if (error) {
              console.error('Cloudinary delete error:', error);
            } else {
              console.log('Old image deleted from Cloudinary:', result);
            }
          });
        }

        // Add new image to update query
        updates.push('profile_URL = ?', 'public_Id = ?');
        values.push(newImageUrl, newPublicId);

        // Final update query
        const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE email = ?`;
        values.push(email);

        db.query(updateQuery, values, (err2, results2) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ msg: 'Error updating profile' });
          }
          return res.json({ msg: 'Profile updated successfully', imageUrl: newImageUrl });
        });
      });
    } else {
      // No new profile pic, update only username/password
      if (updates.length === 0) {
        return res.status(400).json({ msg: 'No changes provided' });
      }

      const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE email = ?`;
      values.push(email);

      db.query(updateQuery, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Error updating profile' });
        }
        return res.json({ msg: 'Profile updated successfully' });
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
