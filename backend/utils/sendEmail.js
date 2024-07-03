require('dotenv')
const nodemailer  = require("nodemailer")
const msg  = require("nodemailer-mailgun-transport")
const fs = require("fs")
const path = require("path")
const {fileURLToPath} = require("url")
const transporter = require("../helpers/emailTransport")


// const transporter



