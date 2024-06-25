const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");


const updatePost = asyncHandler(async (req, res) => {
  const { title, imageUrl, content, category, tag } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    post.category = category;
    post.tag = tag;

    const updatedPost = await post.save();
    res.status(202).json(updatedPost);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }

  res.status(201).json({ message: "updatePost" });
});

module.exports = {updatePost};