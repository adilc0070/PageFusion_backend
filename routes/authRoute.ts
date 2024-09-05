import express from 'express';
import { login, signup } from '../controllers/authController';

const auth = express.Router();

auth.post('/login', login);
auth.post('/signup', signup);

export default auth;
