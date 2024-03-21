const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllTags,
  getCategories,
  createPostComment,
} = require("../controllers/posts");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, admin, createPost);
router.get("/toptags", getAllTags);
router.get("/topcategories", getCategories);

router.route("/:id/comments").post(protect, createPostComment);

router
  .route("/:id")
  .get(getPost)
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

module.exports = router;
