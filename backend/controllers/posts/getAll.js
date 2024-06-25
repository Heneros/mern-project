const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");


const getAll = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
});


module.exports = {getAll}