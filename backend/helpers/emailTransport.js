require("dotenv/config")
const nodemailer = require("nodemailer")
 const mg = require("nodemailer-mailgun-transport");

let transporter;

if (process.env.NODE_ENV === "development") {
  transporter = nodemailer.createTransport({
     host: "127.0.0.1",
      port: 1025,
      secure: false,
  });
} else if (process.env.NODE_ENV === "production") {
  const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  transporter = nodemailer.createTransport(mg(mailgunAuth));
}

module.exports = transporter;