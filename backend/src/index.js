import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
