const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");



const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

module.exports = {getUserProfile};