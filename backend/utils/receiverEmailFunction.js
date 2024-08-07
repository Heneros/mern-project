 require('dotenv').config();
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("../helpers/emailTransport");


 const receiverEmailFunction = async (from, to, subject, payload, template) => {
  try {
    //  const sourceDirectory = fs.readFileSync(path.join(__dirname, template), 'utf8');

    //  const compliedTemplate = handlebars.compile(sourceDirectory);

     const templatePath = path.join(process.cwd(), 'backend', 'utils', 'email', 'template', template);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    const sourceDirectory = fs.readFileSync(templatePath, 'utf8');
    console.log('Template file read successfully');

    const compiledTemplate = handlebars.compile(sourceDirectory);
    console.log('Template compiled successfully');
     const emailOptions = {
            from,
            to: process.env.SENDER_EMAIL,
            subject,
            payload,
            html: compiledTemplate(payload),
        };
        await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {receiverEmailFunction};