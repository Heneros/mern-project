const asyncHandler = require("express-async-handler");
const User = require("../../models/Users")
const VerificationToken = require("../../models/verifyResetTokenModel")
const sendEmail = require("../../utils/sendEmail")

const domainURL = process.env.DOMAIN;

const{randomBytes} =  require("crypto")
/// $-title  Register User and send email verification link
/// $-path POST /api/v1/auth/register
/// $-auth Public


const registerUser = asyncHandler(async(req, res) =>{
  const { email, username, password, passwordConfirm }  = req.body;


  if (!email) {
    res.status(400).json({message: "An email address is required"});
    throw new Error("An email address is required");
  }

  if (!username) {
    res.status(400).json({message: "A username is required"});
    throw new Error("A username is required");
  }

  if (!password) {
    res.status(400).json({mesage: "You must enter a password"}) ;
    throw new Error("You must enter a password");
  }
  if (!passwordConfirm) {
    res.status(400).json({mesage: "Confirm password field is required"}) ;
    throw new Error("Confirm password field is required");
  }


  const userExists = await User.findOne({email});


   if (userExists) {
    res.status(400).json({message:"The email address you've entered is already associated with another account"});
    throw new Error(
      "The email address you've entered is already associated with another account"
    );
  }

  const newUser = new User({
        email,
    username,
    password,
    passwordConfirm,
  });

  const registeredUser = await newUser.save();

   if (!registeredUser) {
    res.status(400).json({message: "User could not be registered"});
    throw new Error("User could not be registered");
  }

  if(registeredUser){
    const verificationToken = randomBytes(32).toString("hex")
    let emailVerificationToken = await new VerificationToken({
        _userId: registeredUser._id,
        token: verificationToken
    }).save() ;

    const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${registeredUser._id}`;

    const payload = {
        name: registeredUser.username,
        link: emailLink
    }

    await sendEmail(
        registeredUser.email,
        "Account Verification",
        payload,
        "./email/template/accountVerification.hadlebars"
    );

    res.json({
        success: true,
        message: `A new user ${registeredUser.username} has been registered! A Verification email has been sent to your account. Please verify within 15 minutes`
    })
}

})




module.exports = registerUser;