const asyncHandler = require("../../middleware/asyncHandler");
const User = require("../../models/Users");


const deleteFavoritePost = asyncHandler(async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favorites.indexOf(postId);

    if (index !== -1) {
      user.favorites.splice(index, 1);
    }

    await user.save();
    res.status(200).json({ message: "Success favorite deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
});

module.exports = deleteFavoritePost;