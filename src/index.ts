import express from 'express';
import mongoose from 'mongoose';
import orderRoutes from './routes/OrderRoutes';
import userRoutes from './routes/UserRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', orderRoutes); 
app.use('/api/auth', userRoutes)
mongoose.connect(process.env.MONGO_URL!, {
  dbName: 'pastadag'
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
})



app.listen(4000, () => {
  console.log('Server is running on port 4000');
})

