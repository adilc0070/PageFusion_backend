import express, { Request, Response } from 'express';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const app = express();

// Set size limits for JSON and URL-encoded payloads
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB file size limit, adjust as needed
});

// app.post('/generate-pdf', async (req: Request, res: Response) => {

//     const { pages }: { pages: string[] } = req.body; //this should be like this pages: ['data:application/pdf;base64,JVBERi0xLjcKJYGBgY..................................', 'data:application/pdf;base64,JVBERi0xLjcKJYGBgY...............................']

//     if (!pages || pages.length === 0) {
//         return res.status(400).send('No pages provided.');
//     }

//     try {
//         const newPdf = await PDFDocument.create();

//         for (const pageBase64 of pages) {
//             const pageBytes = Buffer.from(pageBase64, 'base64');
//             const pdfDoc = await PDFDocument.load(pageBytes);
//             const [page] = await newPdf.copyPages(pdfDoc, [0]);
//             newPdf.addPage(page);
//         }

//         const pdfBytes = await newPdf.save();
//         res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBytes);
//     } catch (err) {
//         console.error('Error generating PDF:', err);
//         res.status(500).send('Failed to generate PDF');
//     }
// });

app.post('/generate-pdf', async (req: Request, res: Response) => {
    const { pages }: { pages: string[] } = req.body;

    if (!pages || pages.length === 0) {
        return res.status(400).send('No pages provided.');
    }

    try {
        const newPdf = await PDFDocument.create();

        for (const pageBase64 of pages) {
            const base64Data = pageBase64.replace(/^data:application\/pdf;base64,/, '');
            const pageBytes = Buffer.from(base64Data, 'base64');
            const pdfDoc = await PDFDocument.load(pageBytes);
            const [page] = await newPdf.copyPages(pdfDoc, [0]);
            newPdf.addPage(page);
        }

        res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        const pdfBytes = await newPdf.save();
        const pdfBase64 = `data:application/pdf;base64,${pdfBytes.toString()}`;
        res.json({ pdf: pdfBase64 });
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Failed to generate PDF');
    }
});


app.post('/upload', upload.single('pdf'), async (req: Request, res: Response) => {
    console.log('File uploaded:', req.file);

    const filePath: string | undefined = req.file?.path;

    if (!filePath) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        const pages: string[] = [];
        for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(page);
            const pdfBytes = await newPdf.save();
            pages.push(`${Buffer.from(pdfBytes).toString('base64')}`);
        }

        res.json({ pages });
    } catch (err) {
        console.error('Error processing PDF:', err);
        res.status(500).send('Failed to process PDF');
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
    }
});

app.listen(3000, () => console.log('Server started on port 3000 \t http://localhost:3000'));
