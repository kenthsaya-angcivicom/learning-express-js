import express, { Request, Response } from 'express';
import config from './config/config';
import { connectToDB } from './db/database';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import { errorHandler } from './middlewares/errorHandler';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

dotenv.config();

const app = express()
app.use(express.json())


app.get('/', (_req: Request, res: Response) => {
    connectToDB()
    res.status(200).json({ message: "Hello world" });
});

app.get('/pdf', (_req: Request, res: Response) => {
    const doc = new PDFDocument();
    doc.pipe(res);

    // Set up document formatting
    doc.font('Times-Roman');
    doc.fontSize(24).text('Research Paper Title', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Author Name', { align: 'center' });
    doc.fontSize(12).text('University Department', { align: 'center' });
    doc.fontSize(12).text('Email: author@university.edu', { align: 'center' });
    doc.moveDown(2);

    // Abstract section
    doc.fontSize(12).text('Abstract', { underline: true });
    doc.fontSize(10)
        .text('This research paper presents findings on an important topic in computer science. The study examines various aspects and provides detailed analysis of the results. Through extensive experimentation and data collection, we demonstrate significant improvements over existing methods.', {
            align: 'justify',
            columns: 1
        });
    doc.moveDown(2);

    // Introduction section
    doc.fontSize(12).text('1. Introduction', { underline: true });
    doc.fontSize(10)
        .text('The field of computer science has seen rapid advancement in recent years. This paper explores key developments and their implications for future research. We present a comprehensive review of existing literature and identify gaps in current understanding.', {
            align: 'justify',
            columns: 1
        });
    doc.moveDown();

    // Methods section
    doc.fontSize(12).text('2. Methods', { underline: true });
    doc.fontSize(10)
        .text('Our methodology combines quantitative and qualitative approaches. We conducted experiments using state-of-the-art equipment and collected data from multiple sources. Statistical analysis was performed using standard tools and techniques.', {
            align: 'justify',
            columns: 1
        });
    doc.moveDown();

    // Results section
    doc.fontSize(12).text('3. Results', { underline: true });
    doc.fontSize(10)
        .text('The results indicate a significant improvement in performance metrics. Key findings include:\n\n• Finding 1: Improved efficiency by 45%\n• Finding 2: Reduced error rates by 30%\n• Finding 3: Enhanced scalability across different scenarios', {
            align: 'justify',
            columns: 1
        });
    doc.moveDown();

    // Discussion section
    doc.fontSize(12).text('4. Discussion', { underline: true });
    doc.fontSize(10)
        .text('Our findings suggest several important implications for both theory and practice. The results demonstrate the effectiveness of our approach and highlight areas for future research.', {
            align: 'justify',
            columns: 1
        });
    doc.font('Courier');
    doc.addPage();
    doc.fontSize(25).text('Hello world!', 100, 100);
    doc.moveTo(0, 20)                               // set the current point
        .lineTo(100, 160)                            // draw a line
        .quadraticCurveTo(130, 200, 150, 120)        // draw a quadratic curve
        .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
        .lineTo(400, 90)                             // draw another line
        .stroke();
    doc.end();
});

app.get("/api/email", async (req: Request, res: Response) => {
    console.log("Sending email...")

    const email = process.env.GMAIL_EMAIL
    const password = process.env.GMAIL_PASSWORD

    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        auth: {
            user: email,
            pass: password,
        },
    });

    console.log(email, password)

    const mailOptions = {
        from: "Test <" + email + ">",
        to: process.env.GMAIL_EMAIL,
        subject: "Test Email",
        text: "This is a test email",
    };

    let info = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: "Email sent" });
        }
    });

    console.log("Message sent: ");

});

app.use("/api/users", userRouter)


app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});