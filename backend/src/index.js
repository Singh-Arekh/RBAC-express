import express, { json } from 'express';
import dbConnect from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
dbConnect();
const app = express();

// Configure CORS to allow specific origins
const corsOptions = {
  origin: 'https://rbac-express-gsei-git-main-singh-arekhs-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
};

app.use(cors(corsOptions)); 

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
