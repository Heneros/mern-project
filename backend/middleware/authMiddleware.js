const User = require("../models/Users");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.blog_info;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded)

      if (decoded.userId) {
        req.user = await User.findById(decoded.userId).select("-password");
      } else {
        req.user = await User.findById(decoded.id); ///auth google
      }
      //

      console.log("req.user", req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
