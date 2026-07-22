import nodemailer from 'nodemailer'
import dotenv from "dotenv"
const transporter=nodemailer.createTransport({
    service:"Gamil",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    },
});

export const sendOtp=async(to,otp)=>{
    await transporter.sendMail({
        from:process.env.Email,
        to,
        subject:"reset your password",
        html:`<p> your otp for password reset is <b>${otp}</b>. It will  expires in  5 minutes.</p>`
    })

}