import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, html, attachments = []) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "smtp.gmail.com",
            port: 587,
            secure: false,
            family: 4,  // it forces IPV4 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: "Admin : abc@gmail.com",
            to,
            subject,
            html,
            attachments,
        });
    }
    catch (error) {
        console.log("Email Failed to Send", error);
    }
};
export default sendEmail;
