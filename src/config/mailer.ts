import nodemailer from "nodemailer";

const transporterOption: any = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === "465", // Set secure to true only for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Create transporter using environment variables
const transporter = nodemailer.createTransport(transporterOption);

// Freeze the transporter to avoid reassignment
const Mailer = Object.freeze(transporter);

export default Mailer;
