require('dotenv')
const nodemailer  = require("nodemailer")
const msg  = require("nodemailer-mailgun-transport")
const fs = require("fs")
const path = require("path")
const {fileURLToPath} = require("url")
const transporter = require("../helpers/emailTransport")

const __filename = fileURLToPath(__filename);
const __dirname = path.dirname(__filename)

const sendEmail = async(email, subject, payload, template ) =>{
    try {
       const sourceDirectory = fs.readFileSync(path.join(__dirname, template),
      'utf8'
    ) 
    } catch (error) {
        
    }
}



module.exports = sendEmail