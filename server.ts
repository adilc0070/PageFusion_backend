import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import pdf from './routes/pdfRoute';
import auth from './routes/authRoute';
import connectDB from './middleware/db';

configDotenv();

const app = express();
connectDB();
console.log('orgin :', process.env.ORIGIN);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
    origin: `${process.env.ORIGIN}`,
    methods: ['POST', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/pdf', pdf);  
app.use('/auth', auth); 

app.listen(3003, () => console.log('Server started on port 3003 \t http://localhost:3003'));
