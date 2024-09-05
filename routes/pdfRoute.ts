import express from 'express';
import { generatePdf } from '../controllers/pdfController';

const pdf = express.Router();

pdf.post('/generate-pdf', generatePdf);

export default pdf;
