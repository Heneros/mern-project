const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllPublicUsers,
} = require("../controllers/user");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  addToFavorites,
  getAllFavorites,
  deleteFavoritePost,
} = require("../controllers/posts");
const feedbackForm = require("../utils/email");

const router = express.Router();

router.route("/").post(createUser).get(protect, admin, getAllUsers);
router.route("/allusers").get(getAllPublicUsers);

router.route("/auth").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(protect, getUser).delete(deleteUser).put(updateUser);
router.route("/logout").post(logoutUser);

router.route("/feedback").post(protect, feedbackForm);

router.route("/addfavorite/:userId/:postId").post(addToFavorites);
router.route("/deletefavorite/:userId/:postId").delete(deleteFavoritePost);
router.route("/getfavorites/:userId").get(protect, getAllFavorites);

module.exports = router;
