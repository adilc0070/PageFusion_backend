import express from 'express';
import { configDotenv } from 'dotenv';
import pdf from './routes/pdfRoute';
import auth from './routes/authRoute';
import connectDB from './middleware/db';

configDotenv();

const app = express();
connectDB();

// Set size limits for JSON and URL-encoded payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${process.env.ORIGIN}`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Use routes
app.use('/pdf', pdf);  // Use PDF routes under '/pdf' path
app.use('/auth', auth); // Use Auth routes under '/auth' path

// Start the server
app.listen(3003, () => console.log('Server started on port 3003 \t http://localhost:3003'));
