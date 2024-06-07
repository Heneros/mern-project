const Post = require("../../models/Posts");
const asyncHandler = require("../../middleware/asyncHandler");

///GET
const getAllPosts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (!posts) {
    res.status(200).json({ message: "Not found" });
  }
  res.status(200).json({ posts, page, pages: Math.ceil(count / pageSize) });
});


module.exports = getAllPosts;