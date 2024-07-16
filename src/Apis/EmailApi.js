import * as express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();


router.post('/send-email', async (req, res) => {
    const { from, to, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sanasyed1998786@gmail.com',
            pass: 'hpyq byqo qcxb fecw'
        }
    });
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).json({ error: 'Error sending email.' });
        } else {
            res.status(200).json({ message: 'Email sent successfully.' });
        }
    });
});

export default router;