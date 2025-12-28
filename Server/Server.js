require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const app = express();
const uploadRoutes = require('./Routes/UploadRoutes.js')
const authRoutes = require('./Routes/authRoutes.js');
const postControllers = require('./Controllers/postControllers.js');
const authControllers = require('./Controllers/authControllers.js')
const MyprofileRoutes = require('./Routes/MyprofileRoutes.js')
const Gmail = require('./Gmail/Email.js')
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api',uploadRoutes);
app.use('/api/home',postControllers)
app.use('/api/profile',MyprofileRoutes)
app.use('/api/gmail',Gmail)
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);   
    }
    console.log(`Server runs at port : ${PORT}`);
});