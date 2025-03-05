import express, { json } from 'express';
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// const dotenv = require('dotenv').config();
dotenv.config();
dbConnect();
const app = express();

//middleware
app.use(json());
//Routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)

//server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log((`server is running on ${PORT}`))
})