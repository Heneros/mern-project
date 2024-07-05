const resendEmailVerificationToken =require("../controllers/auth/resendVerifyEmailController");
const registerUser = require("../controllers/auth/registerController");
const verifyEmail = require("../controllers/auth/verifyEmailController");
const authUser = require("../controllers/auth/authUser");

const newAccessToken = require("../controllers/auth/refreshTokenController");


const express = require("express");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyEmail);
router.get("/auth", authUser);
  
router.get("/new_access_token", newAccessToken);
router.post("/resend_email_token", resendEmailVerificationToken);

module.exports = router;