const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllTags,
  getCategories,
} = require("../controllers/posts");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, createPost);
router.get("/toptags", getAllTags);
router.get("/topcategories", getCategories);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
