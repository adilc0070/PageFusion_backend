import { Request, Response } from 'express';
import { PDFDocument } from 'pdf-lib';

export const generatePdf = async (req: Request, res: Response) => {
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

        const pdfBytes = await newPdf.save();
        res.setHeader('Content-Disposition', 'attachment; filename=pagefusion.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Failed to generate PDF');
    }
};
