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
  getAll,
} = require("../controllers/posts");
const { protect, admin } = require("../middleware/authMiddleware");
const checkObjectId = require("../middleware/checkObjectId");

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, admin, createPost);
router.route("/getall").get(getAll);
router.get("/toptags", getAllTags);
router.get("/topcategories", getCategories);

router.route("/:id/comments").post(protect, checkObjectId, createPostComment);

router
  .route("/:id")
  .get(checkObjectId, getPost)
  .put(protect, admin, checkObjectId, updatePost)
  .delete(protect, admin, checkObjectId, deletePost);

module.exports = router;
