const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");


const getPost = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.id);
  const postId = req.params.id;
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.incrementViews();
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Not found ${postId}` });
    return;
  }
});

module.exports ={getPost};