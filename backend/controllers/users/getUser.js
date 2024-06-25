const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");


const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User don't exist" });
  }
});

module.exports = {getUser};