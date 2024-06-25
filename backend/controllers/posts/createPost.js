const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");

const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, tag, imageUrl, user } = req.body;

    const post = await Post.create({
      title,
      content,
      tag,
      category,
      imageUrl,
      user,
    });

    if (post) {
      res.status(201).json({
        id: post._id,
        title: post.title,
        content: post.content,
        category: post.category,
        tag: post.tag,
        imageUrl: post.imageUrl,
        user: post.user,
      });
    }

    // if (!title && !imageUrl && !category) {
    // console.log({ title, imageUrl, content, category, tag });
    // if (!title) {
    //   res.status(400).json({ message: "Empty fields" });
    //   return;
    // }

    // const post = new Post({
    //   title,
    //   imageUrl,
    //   category,
    //   tag,
    //   content,
    //   user: req.user._id,
    // });

    // const createdPost = await post.create();

    // if (createdPost) {
    //   res.status(201).json(createdPost);
    // } else {
    //   res.status(400).json({ message: "Invalid post data" });
    // }
  } catch (error) {
    console.error(error);
  }
});

module.exports = {createPost};
