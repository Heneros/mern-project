const User = require("../models/Users");
const asyncHandler = require("../middleware/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {});
const getUser = asyncHandler(async (req, res) => {});
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });
  if (user) {
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
const updateUser = asyncHandler(async (req, res) => {});
const deleteUser = asyncHandler(async (req, res) => {});
const authUser = asyncHandler(async (req, res) => {});
const logoutUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
};
