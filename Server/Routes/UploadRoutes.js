const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../Config/db.js');
const { storage } = require('../Config/CloudinaryConfig.js'); 

const upload = multer({ storage }); 

router.post('/uploads', upload.single('image'), (req, res) => {
  const { email , title , description} = req.body;
  console.log(req.file);
  const imageURL = req.file.path; 
  const public_Id = req.file.filename ;
  console.log(imageURL);
  if (!email || !imageURL) {
    return res.status(400).json({ msg: 'Missing email or image' });
  }

  const query = 'INSERT INTO user_images (email,image_url,title,description,public_id) VALUES (?, ?,?,?,?)'; 
  db.query(query, [email, imageURL,title , description,public_Id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Error uploading image to database' });
    }

    console.log('Uploaded successfully');
    return res.json({
      id: results.insertId,
      email,
      image: imageURL,
      title:title,
      description:description,
    });
  });
});


router.get('/blogs',(req,res)=>{
  const query = 'SELECT image_url from user_images ;' ;
  db.query(query,(err,results)=>{
    if(err){ return res.status(400).json({msg:'Error in loading the blogs'})}
    return res.status(200).json({results})
  });

});

module.exports = router;
