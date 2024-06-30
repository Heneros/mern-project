const asyncHandler = require("express-async-handler")
const Post = require("../../models/Users");
const VerificationToken = require("../../models/verifyResetTokenModel");
const{randomBytes} = await require("crypto")
const domainURL = process.env.DOMAIN;


/// $-title Resend Email Verification Token
/// $-path POST /api/v1/auth/resend_email_token
/// $-auth Public


const resendEmailVerificationToken = asyncHandler(async(req, res) => {
      const { email } = req.body;


      const user = await User.findOne({email})

      if(!email){
        res.status(400).json({message: "An email must be provided"})
      }

    if(!user){
        res.status(400).json({message: "We were unable to find a user with that email address"})
      }

      if(user.isVerified){
    res.status(400).json({message: "This account has already been verified. Please login"})
      }

      let verificationToken =  await VerificationToken.findOne({ userId: user._id});

      if(verificationToken){
        await VerificationToken.deleteOne()
      }
      const resentToken = randomBytes(32).toString("hex");

      let emailToken = await new VerificationToken({
        _userId: user._id,
        token: resentToken
      }).save();

      const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

      const payload = {
        name: user.firstName ? user.firstName : "Anonym",
        link: emailLink
      }

      res.json({
            success: true,
    message: `${user.firstName}, an email has been sent to your account, please verify within 15 minutes`,
      });

})

module.exports = resendEmailVerificationToken;
