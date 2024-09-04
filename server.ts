import express, { Request, Response } from 'express';
import { PDFDocument } from 'pdf-lib';
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

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

app.post('/generate-pdf', async (req: Request, res: Response) => {
    const { pages }: { pages: string[] } = req.body;

    if (!pages || pages.length === 0) {
        return res.status(400).send('No pages provided.');
    }

    try {
        const newPdf = await PDFDocument.create();

        for (const pageBase64 of pages) {
            // Decode base64 and load PDF
            const base64Data = pageBase64.replace(/^data:application\/pdf;base64,/, '');
            const pageBytes = Buffer.from(base64Data, 'base64');
            const pdfDoc = await PDFDocument.load(pageBytes);
            const [page] = await newPdf.copyPages(pdfDoc, [0]);
            newPdf.addPage(page);
        }

        // Generate PDF bytes and send as response
        const pdfBytes = await newPdf.save();
        res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Failed to generate PDF');
    }
});

app.listen(3000, () => console.log('Server started on port 3000 \t http://localhost:3000'));
