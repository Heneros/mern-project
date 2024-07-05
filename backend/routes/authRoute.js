const resendEmailVerificationToken =require("../controllers/auth/resendVerifyEmailController");
const registerUser = require("../controllers/auth/registerController");
const verifyEmail = require("../controllers/auth/verifyEmailController");
const authUser = require("../controllers/auth/authUser");
const {loginLimiter} = require("../middleware/apiLimiter");
const newAccessToken = require("../controllers/auth/refreshTokenController");


const express = require("express");

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/verify/:emailToken/:userId").get(verifyEmail);
router.route("/auth").get(loginLimiter, authUser);
router.route("/new_access_token").get(newAccessToken);
router.route("/resend_email_token").post(resendEmailVerificationToken);


module.exports = router;