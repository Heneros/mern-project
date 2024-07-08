const asyncHandler = require("express-async-handler");

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("blog_info", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // user.isLoggedIn = false;
  // await user.save();
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = logoutUser;