require('dotenv').config();
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("../helpers/emailTransport");
const { systemLogs } = require("./Logger");

const sendEmail = async (email, subject, payload, template) => {
  console.log('sendEmail function called'); 
  try {
    const templatePath = path.join(process.cwd(), 'backend', 'utils', 'email', 'template', template);
    console.log(`Attempting to use template path: ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    const sourceDirectory = fs.readFileSync(templatePath, 'utf8');
    console.log('Template file read successfully');

    const compiledTemplate = handlebars.compile(sourceDirectory);
    console.log('Template compiled successfully');

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload)
    };
    console.log('Email options prepared:', JSON.stringify(emailOptions, null, 2));

    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully.");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(`Error in sendEmail function: ${error.message}`);
    console.error(error.stack);
    // systemLogs.error(`Email was not sent: ${error}`);
    return { success: false, message: `Email was not sent: ${error.message}` };
  }
};



module.exports = sendEmail;