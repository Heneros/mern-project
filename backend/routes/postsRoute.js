const express = require("express");
// const {
//   getAll,
//   createPost,
//   getPost,
//   updatePost,
//   deletePost,
//   getAllTags,
//   getCategories,
//   createPostComment,
//   getAll,
//   addToFavorites,
// } = require("../controllers/posts");


const {getAllPosts} = require("../controllers/posts/getAllPosts");

const {createPost} = require("../controllers/posts/createPost");
const {createPost} = require("../controllers/posts/getAll");



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
