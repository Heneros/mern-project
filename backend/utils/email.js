const nodemailer = require("nodemailer");
const asyncHandler = require("../middleware/asyncHandler");

const feedbackForm = asyncHandler(async (req, res) => {
  let transporter = null;
  if (process.env.NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      // host: "smtp-relay.brevo.com",
      // port: 25,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_NAME,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
    });
    // console.log('Send prod')
  } else {
    transporter = nodemailer.createTransport({
      // host: "localhost",
      host: "127.0.0.1",
      //   port: 1080,
      port: 1025,
      secure: false,
      auth: {
        user: process.env.SMTP_NAME,
        pass: process.env.SMTP_PASS,
      },
        tls: {
          rejectUnauthorized: false,
        },
      debug: true,
    });
  }
  const { name, subject, email, message } = req.body;

  const mailOptions = {
    from: `From ${email}`,
    to: process.env.SMTP_NAME,
    subject: `Subject ${subject}`,
    text: `Name ${name} . Message ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error message from server. Send Mail ");
    } else {
      // console.log("Success" + info.response);
      res.status(200).send("Success message was sent ");
    }
  });
});

module.exports = feedbackForm;
