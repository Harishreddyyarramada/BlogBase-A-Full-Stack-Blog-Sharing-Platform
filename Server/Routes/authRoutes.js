require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../Config/db.js');
const router = express.Router();
const {verifyFirebaseToken} = require('../Middleware/VerifyToken.js');
const saltrounds = 10;

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? ;';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error' });
    if (results.length > 0) {
      return res.status(400).json({ msg: 'User already exists with the same email...!' });
    }
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    db.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?);',
      [username, hashedPassword, email],
      (err, results) => {
        if (err) {
          return res.status(400).json({ msg: 'Error saving data into database' });
        }
        return res.status(201).json({ msg: 'Registered successfully' });
      }
    );
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?;';

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(400).json({ msg: 'DB Error' });

    if (results.length === 0) {
      return res.status(400).json({ msg: 'User not Found' });
    }

    const user = results[0];
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: 'Password is incorrect' });
    }

    const token = jsonwebtoken.sign(
      { email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPRIES_IN }
    );
    db.query('select count(*) as Total from users ;',(err,results)=>{
      if(err){
        return res.status(400).json({msg:' Error in Database'})
      }
      let total_users = results[0].Total;
      return res.status(200).json({ msg: 'Logged in successfully', token ,username : user.username ,total_users : total_users,profile_URL:user.profile_URL});
    });
    
      });
});
router.post('/google',async(req,res)=>{
  const { token } = req.body; 
  if (!token) { return res.status(400).json({ error: 'Token is required' }); }
  try {
    const userData = await verifyFirebaseToken(token);
    console.log(userData);
    res.json({ success: true, user: userData });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
});

module.exports = router;

