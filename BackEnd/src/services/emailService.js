const nodemailer = require("nodemailer");
const dotenv=require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (email) => {
const mailOptions = {
  from: `"CodeLens" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎉 Welcome to CodeLens 🎉 ",
  text: `Hi there,

Thank you for subscribing to CodeLens!  
Get ready for premium code reviews, tips, and exclusive updates delivered straight to your inbox.

Stay tuned – the best is yet to come!

— The CodeLens Team`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; color: #333;">
    <div style="text-align: center;">
      <img src="https://res.cloudinary.com/dwxxc5rev/image/upload/v1755014669/logo-white_jxtbcu.png" alt="CodeLens Logo" style="max-width: 180px; margin-bottom: 15px;" />
      <h1 style="color: #4CAF50; margin-bottom: 10px;"> Welcome to CodeLens!</h1>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      Hey there,  
      Thanks for subscribing to <b>CodeLens</b>! 🚀  
      You’ve officially joined our growing community of developers who want cleaner, smarter, and faster code.
    </p>
    <p style="font-size: 16px; line-height: 1.6;">
      Expect to receive <b>exclusive coding tips</b>, <b>AI-powered reviews</b>, and insights straight to your inbox.  
      We’re excited to help you write code like a pro! 💻
    </p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://codelens-frontend-d1u2.onrender.com" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        Visit CodeLens
      </a>
    </div>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777; text-align: center;">
      © ${new Date().getFullYear()} CodeLens. All rights reserved.  
      If you didn’t subscribe, you can safely ignore this email.
    </p>
  </div>
  `
};


  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
