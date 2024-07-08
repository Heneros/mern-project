
const jwt = require("jsonwebtoken")
const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please provide an email and password" });
  }

  const user = await User.findOne({ email });

  // if(!user || !(!await user.comparePassword(password))){
  //       res.status(401).json({message: 'Incorrect email or password'})
  // }
  if (user && (await user.matchPassword(password))) {
    ////  generateToken(res, user._id);
    // user.isLoggedIn = true;
    const accessToken = jwt.sign(
      {
        id: user._id,
        roles: user.roles,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const newRefreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const cookies = req.cookies;

    let newRefreshTokenArray = !cookies?.jwt ? user.refreshToken :  user.refreshToken.filter((refT) => refT !== cookies.jwt )

    if(cookies?.jwt){
      const refreshToken = cookies.jwt;
      const existingRefreshToken = await User.findOne({
refreshToken
      }).exec();

      if(!existingRefreshToken){
        newRefreshToken = []
      }
            const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      };

      res.clearCookie("jwt", options);
    }
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken]

    await user.save();

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    };

    res.cookie("jwt", newRefreshToken, options);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isEditor: user.isEditor,
      isLoggedIn: true,
      accessToken,
    });
  } else {
    res.status(401).json({ message: `Invalid data` });
  }
});


module.exports = authUser;