// app.ts
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/UserRoutes';
import orderRoutes from './routes/OrderRoutes';
import mongoose from 'mongoose';
import cors from 'cors';





const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL!, {
  dbName: 'pastadag'
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});