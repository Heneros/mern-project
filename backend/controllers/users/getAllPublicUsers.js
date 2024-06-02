const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");


const getAllPublicUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -email -isAdmin -userId");
  res.status(200).json(users);
});

module.exports = getAllPublicUsers;