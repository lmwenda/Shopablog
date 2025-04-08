import nodemailer from "nodemailer";

const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.mail_email,
        pass: process.env.mail_password,
    },
})

export default mail;