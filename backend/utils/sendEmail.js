require('dotenv')

const fs = require("fs")
const handlebars = require("handlebars")
const path = require("path")
const {fileURLToPath} = require("url")
const transporter = require("../helpers/emailTransport")
const {systemLogs} = require("./Logger")

const __filenamee = fileURLToPath(meta.url);
const __dirnamee = path.dirname(__filenamee)

const sendEmail = async(email, subject, payload, template ) =>{
    try {
       const sourceDirectory = fs.readFileSync(path.join(__dirnamee, template),
      'utf8'
    ) ;
    const compliedTemplate = handlebars.compile(sourceDirectory);
    const emailOptions ={
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compliedTemplate(payload)
    }; 
    await transporter.sendEmail(emailOptions)
    } catch (error) {
      console.log(`email was not sent: ${error}`);
      systemLogs.error(`email was not sent: ${error}`);
    }
}

module.exports = sendEmail