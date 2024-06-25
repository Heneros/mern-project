const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");

const createPostComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    if (!comment || !req.user.username) {
      res.status(400);
      throw new Error("Both comment and username are required");
    }
    const commentSingle = {
      username: req.user.username,
      comment,
      user: req.user._id,
    };
    // console.log({ commentSingle });
    post.comments.push(commentSingle);
    await post.save();
    res.status(201).json({ message: "Comment added successfully" });
  } else {
    res.status(404).json({ message: "Try authorize" });
  }
});

module.exports  = {createPostComment};