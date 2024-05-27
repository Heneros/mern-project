const jwt = require("jsonwebtoken")
const User = require("../models/Users");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");

const getAllPublicUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -email -isAdmin -userId");
  res.status(200).json(users);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User don't exist" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

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

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isEditor = Boolean(req.body.isEditor);

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isEditor: updatedUser.isEditor,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

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
      const existingRefrehToken = await User.findOne({
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

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("blog_info", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // user.isLoggedIn = false;
  // await user.save();
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = {
  getUserProfile,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
  updateUserProfile,
  getAllPublicUsers,
};
