const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");

const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOneAndDelete({ _id: postId });
  if (!post) {
    return res.status(404).json({ msg: `Not found pst ${postId} to delete` });
  }
  res.status(201).json({ post });
});

module.exports = {deletePost};