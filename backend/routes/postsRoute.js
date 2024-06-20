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
const {getAll} = require("../controllers/posts/getAll");
const {createPostComment} = require("../controllers/posts/createPostComment");
const {getPost} = require("../controllers/posts/getPost");
const {updatePost} = require("../controllers/posts/updatePost");
const {deletePost} = require("../controllers/posts/deletePost");




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
