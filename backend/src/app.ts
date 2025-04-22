import express from 'express';
import path from 'path';
import authRoutes from './routes/auth';
import 'dotenv/config';
import cors from "cors"
import { profile } from 'console';
import userRoute from './routes/profile';
import meetingRoute from './routes/meeting';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "*",
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use("/profile",userRoute);
app.use("/meeting",meetingRoute)

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
