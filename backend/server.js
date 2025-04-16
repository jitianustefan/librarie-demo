import express from 'express';
import dotnev from 'dotenv';
dotnev.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';



const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...J');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));