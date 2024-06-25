const User = require("../../models/Users");
const asyncHandler = require("../../middleware/asyncHandler");



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

module.exports = {updateUser};