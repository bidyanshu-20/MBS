// import nodemailer from 'nodemailer';
// const sendEmail = async(email,subject,message)=>{
//     const transporter = nodemailer.createTransport({
//         host:'smtp.gmail.com',
//         port:587,
//         secure:false,
//         family: 4,  // it forces IPV4 

//         auth:{
//             user:process.env.EMAIL_USER,
//             pass:process.env.EMAIL_PASS
//         }
//     });

//     await transporter.sendMail({
//         from:process.env.MY_EMAIL,
//         to:email,
//         subject,
//         text:message
//     })
// }
// export default sendEmail;


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, message) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: message,
    });
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

export default sendEmail;