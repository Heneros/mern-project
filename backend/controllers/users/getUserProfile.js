const User = require("../../models/Users");
// import { asyncHandler } from 'express-async-handler';
const asyncHandler = require("express-async-handler");



const getUserProfile = asyncHandler(async (req, res) => {
  
  // const user = await User.findById(req.user._id);
  // if (user) {
  //   res.status(200).json(user);
  // } else {
  //   res.status(404).json({ message: "Profile not found" });
  // }
   try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {getUserProfile};