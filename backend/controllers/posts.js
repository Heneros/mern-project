const Post = require("../models/Posts");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/Users");

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

const getAll = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
});

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

const updatePost = asyncHandler(async (req, res) => {
  const { title, imageUrl, content, category, tag } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    // if (imageUrl) {
    //   post.imageUrl = imageUrl;
    // }

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

const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOneAndDelete({ _id: postId });
  if (!post) {
    return res.status(404).json({ msg: `Not found pst ${postId} to delete` });
  }
  res.status(201).json({ post });
});

const getAllTags = asyncHandler(async (req, res) => {
  try {
    const tag = await Post.distinct("tag");
    res.status(200).json(tag);
    // console.log(tag);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log("Error Tag", error);
  }
});
const getCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Post.distinct();
    // const category = await Post.find({}).select('-title ');

    // const category = await Post.aggregate([
    //   {
    //     $group: {
    //       _id: "$_id",
    //       category: { $addToSet: "$category" },
    //       imageUrl: { $first: "$imageUrl" },
    //     },
    //   },
    // ]);

    if (category) {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log("Error category", error);
  }
});

// const addToFavorites = asyncHandler(async (req, res) => {});

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

const addToFavorites = asyncHandler(async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: postId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error favorites added" });
  }
});

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

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  addToFavorites,
  getAllTags,
  getCategories,
  createPostComment,
  getAll,
  getAllFavorites,
};
