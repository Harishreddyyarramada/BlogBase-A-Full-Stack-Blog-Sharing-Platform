const express = require('express');
const middleware = require('../Middleware/authMiddleware.js');
const router = express.Router();
const db = require('../Config/db.js');

router.get('/posts',(req, res) => {
  const { email } = req.query;

  const query = 'SELECT * FROM user_images WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error fetching posts', error: err });
    }

    return res.status(200).json({results});
  });
});

router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'SELECT * FROM user_images WHERE id = ?';
  db.query(query, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error fetching post', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.status(200).json(results[0]);
  });
});

module.exports = router;
