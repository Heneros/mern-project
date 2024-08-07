const nodemailer = require('nodemailer');
const asyncHandler = require('../../middleware/asyncHandler');
// const sendEmail = require('../../utils/sendEmail');
const {receiverEmailFunction} = require('../../utils/receiverEmailFunction');

const feedbackForm = asyncHandler(async (req, res) => {
    const { name, subject, email, message } = req.body;
    const payload = {
        name: name,
        subject,
        email,
        message,
    };  
   const receiverEmail = process.env.AUTHOR_APP;

    await receiverEmailFunction(
        email,
        receiverEmail,
        'Email from user',
        payload,
        './feedbackFormMessage.handlebars',
    );

    res.status(200).json({
        success: true,
        message: `Message was sent! `,
    });
});

module.exports = feedbackForm;
