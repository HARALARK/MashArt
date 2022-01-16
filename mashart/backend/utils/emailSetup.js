import nodemailer from "nodemailer"

export const getTransporter = () => {
  const email = process.env.EMAIL
  const password = process.env.EMAIL_PASSWORD
  // Transporter with the required configuration for Outlook
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: email,
      pass: password,
    },
  })
}
