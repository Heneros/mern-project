const nodemailer = require("nodemailer");
const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("./sendEmail")


const feedbackForm = asyncHandler(async (req, res) => {
const { name, subject, email, message } = req.body;
const payload = {
name: name,
subject, 
email,
message
}

await sendEmail(
  email,
   "Account Verification",
   payload,
   "./email/template/feedbackFormMessage.handlebars"
  );


    res.status(200).json({
    success: true,
    message: `Message was sent! `
  });

});

module.exports = feedbackForm;
