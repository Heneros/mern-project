const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");


const updatePost = asyncHandler(async (req, res) => {
  const { title, imageUrl, content, category, tag } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {

    post.title = title;
    post.content = content;
    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    post.category = category;
    post.tag = tag;

    const updatedPost = await post.save();
    return res.status(200).json(updatedPost);
  } else {
    return res.status(404).json({ message: "Resource not found" });
  }
});

module.exports = { updatePost };