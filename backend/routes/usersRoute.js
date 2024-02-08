const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  authUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/auth").post(authUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
