import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categoryRoute.js';
import ProductRoutes from './routes/productRoute.js';
import ContactRoutes from './routes/contactRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Config
dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send({
        message: 'Soha & Fatmaas Store'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/contact', ContactRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the reset password page
app.get('/reset/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resetPassword.html'));
});

const port = process.env.PORT || 4000;

// Listen to app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
