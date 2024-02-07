const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
