 require('dotenv').config();
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("../helpers/emailTransport");





 const receiverEmailFunction = async (from, to, subject, payload, template) => {
  try {
     const sourceDirectory = fs.readFileSync(path.join(__dirname, template), 'utf8');

     const compliedTemplate = handlebars.compile(sourceDirectory);

     const emailOptions = {
            from,
            to: process.env.SENDER_EMAIL,
            subject,
            payload,
            html: compliedTemplate(payload),
        };
        await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {receiverEmailFunction};