const asyncHandler = require("express-async-handler");
const User = require("../../models/Users");
const VerificationToken = require("../../models/verifyResetTokenModel");
const sendEmail = require("../../utils/sendEmail");


const domainURL = process.env.DOMAIN;

// $-title   Verify User Email
// $-path    GET /api/v1/auth/verify/:emailToken/:userId
// $-auth     Public


const verifyUserEmail = asyncHandler(async(req, res) =>{
    const user = await User.findOne({_id: req.params.userId}).select("-passwordConfirm");

      if (!user) {
    res.status(400).json({message: "We were unable to find a user for this token"});
    throw new Error("We were unable to find a user for this token");
  }
  if (user.isEmailVerified) {
    res.status(400).json({message:"This user has already been verified. Please login"});
  }

  const userToken = await VerificationToken.findOne({
    _userId: user._id,
    token: req.params.emailToken
  });

if (!userToken) {
    res.status(400).json({message:"Token invalid! Your token may have expired"});
  }

  user.isEmailVerified = true;
  await  user.save();

  if(user.isEmailVerified){
    const emailLink = `${domainURL}/login`;


        const payload = {
            name: user.username,
            link: emailLink,
        }


        await sendEmail(
            user.email,
            'Welcome, Account Verified',
            payload,
            "./emails/template/welcome.handlebars"
        );
        res.redirect("/auth/verify")
  }
});

module.exports = verifyUserEmail