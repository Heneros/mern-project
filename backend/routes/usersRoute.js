const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
createUser
} = require("../controllers/users/createUser");
const {
getAllPublicUsers
} = require("../controllers/users/getAllPublicUsers");
const {
getAllFavorites
} = require("../controllers/users/getAllFavorites");
const {
authUser
} = require("../controllers/users/authUser");
const {
getUserProfile
} = require("../controllers/users/getUserProfile");
const {
updateUser
} = require("../controllers/users/updateUser");
const {
getUser
} = require("../controllers/users/getUser");
const {
addToFavorites
} = require("../controllers/users/addToFavorites");
const {
deleteFavoritePost
} = require("../controllers/users/deleteFavoritePost");
const {
getAllUsers
} = require("../controllers/users/getAllUsers");
const {
deleteUser
} = require("../controllers/users/deleteUser");
const {
logoutUser
} = require("../controllers/users/logoutUser");
const {
updateUserProfile
} = require("../controllers/users/updateUserProfile");

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

router.route("/feedback").post( feedbackForm);

router.route("/addfavorite/:userId/:postId").post(addToFavorites);
router.route("/deletefavorite/:userId/:postId").delete(deleteFavoritePost);
router.route("/getfavorites/:userId").get(protect, getAllFavorites);

module.exports = router;
