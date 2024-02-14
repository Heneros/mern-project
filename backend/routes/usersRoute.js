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
} = require("../controllers/user");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(createUser).get(protect, getAllUsers);
router.route("/auth").post(authUser);
router
  .route("/:id")
  .get(protect, getUser)
  .delete(deleteUser)
  .put(updateUserProfile);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect, getUserProfile).put(updateUser);

module.exports = router;
