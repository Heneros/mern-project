const asyncHandler = require("express-async-handler");
const User = require("../../models/Users");
const VerificationToken = require("../../models/verifyResetTokenModel");
const sendEmail = require("../../utils/sendEmail");

const domainURL = process.env.DOMAIN;

const{randomBytes} =  require("crypto")


// $-title   Send password reset email link
// $-path    POST /api/v1/auth/reset_password_request
// $-auth    Public


const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;


    if (!email) {
    res.status(400).json({message: "You must enter your email address"});
  }

  const existingUser = await  User.findOne({email}).select("-passwordConfirm")

  if(!existingUser){
        res.status(400).json({message: "That email is not associated with any account"});
  }

    let verificationToken = await VerificationToken.findOne({
    _userId: existingUser._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resetToken = randomBytes(32).toString("hex")


    let newVerificationToken = await new VerificationToken({
    _userId: existingUser._id,
    token: resetToken,
    createdAt: Date.now(),
  }).save();


  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

  

    const payload = {
          name: existingUser.username,
      link: emailLink,
    }

    await sendEmail( existingUser.email,
      "Password Reset Request",
      payload,
      "./email/template/requestResetPassword.handlebars");

          res.status(200).json({
      success: true,
      message: `Hey ${existingUser.username}, an email has been sent to your account with the password reset link`,
    });
  }
});



const resetPassword = asyncHandler(async(req, res) =>{
      const { password, passwordConfirm, userId, emailToken } = req.body;

      if(!password){
            res.status(400).json({message: "A password is required"})
      }

       if (!passwordConfirm) {
                res.status(400).json({message: "A confirm password field is required"})
  }


    if (password !== passwordConfirm) {
    res.status(400).json({message: "Passwords do not match"});
  }


   if (password.length < 8) {
    res.status(400).json({message: "Passwords must be at least 8 characters long"});;
  }

    const passwordResetToken = await VerificationToken.findOne({ userId });

  if (!passwordResetToken) {
     res.status(400).json({message:       "Your token is either invalid or expired. Try resetting your password again"
})
  }

    const user = await User.findById({
    _id: passwordResetToken._userId,
  }).select("-passwordConfirm");


 if (user && passwordResetToken) {
        user.password = password;
    await user.save();

    const payload = {
      name: user.username,
    };

      await sendEmail(
      user.email,
      "Password Reset Success",
      payload,
      "./email/template/resetPassword.handlebars"
    );
 res.json({
      success: true,
      message: `Hey ${user.username},Your password reset was successful. An email has been sent to confirm the same`,
    });
 }
})

module.exports = {resetPassword, resetPasswordRequest}