const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});


module.exports = getAllUsers;