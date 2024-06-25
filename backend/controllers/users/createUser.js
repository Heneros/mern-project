const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");
const generateToken = require("../../utils/generateToken");


const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isEditor: user.isEditor,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});


module.exports = {createUser};