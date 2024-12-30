import Mailer from "@/config/mailer";

interface SendEmail {
  to: string[] | string; // list of receivers or single receiver
  subject: string; // Subject line
  text?: string; // plain text body
  html?: string; // html body
}

export const sendEmail = async (mailOpt: SendEmail) => {
  // Because Node Mailer t
  const currTo = mailOpt.to;
  const to = Array.isArray(currTo) ? currTo.join(", ") : currTo;
  try {
    return await Mailer.sendMail({
      ...mailOpt,
      to,
      from: process.env.EMAIL_USER,
    });
  } catch (error) {
    console.log("Error while sending mail");
    console.log(error);
  }
};
