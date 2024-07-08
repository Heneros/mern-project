const resendEmailVerificationToken =require("../controllers/auth/resendVerifyEmailController");
const registerUser = require("../controllers/auth/registerController");
const verifyEmail = require("../controllers/auth/verifyEmailController");
const authUser = require("../controllers/auth/authUser");
const logoutUser = require("../controllers/auth/logoutUser");

const {loginLimiter} = require("../middleware/apiLimiter");
const newAccessToken = require("../controllers/auth/refreshTokenController");


const express = require("express");
const { resetPassword, resetPasswordRequest } = require("../controllers/auth/passwordResetController");

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/verify/:emailToken/:userId").get(verifyEmail);
router.route("/").get(loginLimiter, authUser);
router.route("/new_access_token").get(newAccessToken);
router.route("/resend_email_token").post(resendEmailVerificationToken);
router.route("/reset_password_request").post(resetPasswordRequest);
router.route("/reset_password").post(resetPassword);
router.route("/logout").get(logoutUser); 


 
module.exports = router;