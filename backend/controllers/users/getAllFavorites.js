const asyncHandler = require("../../middleware/asyncHandler");
const User = require("../../models/Users");


const getAllFavorites = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favorites = user.favorites;

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(404).json({ message: "Not found favorite" });
  }
});

module.exports = {getAllFavorites}