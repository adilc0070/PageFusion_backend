import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1/pageFusion');
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
