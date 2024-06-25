const asyncHandler = require("../../middleware/asyncHandler");
const User = require("../../models/Users");

const addToFavorites = asyncHandler(async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: postId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error favorites added" });
  }
});
 module.exports = {addToFavorites};