import nodemailer from 'nodemailer';
const sendEmail = async(email,subject,message)=>{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        family: 4,  // it forces IPV4 
        
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from:process.env.MY_EMAIL,
        to:email,
        subject,
        text:message
    })
}
export default sendEmail;