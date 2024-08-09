const User = require("../../models/Users");
const asyncHandler = require("express-async-handler");

const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user found" });
  }

  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    // console.log("Fetching user with ID:", req.user._id);

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

module.exports = {getUserProfile};