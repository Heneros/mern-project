const resendEmailVerificationToken =require("../controllers/auth/resendVerifyEmailController");


const express = require("express");

const router = express.Router();


router.post("/resend_email_token", resendEmailVerificationToken);

module.exports = router;