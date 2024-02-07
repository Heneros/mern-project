const express = require("express");
const { createUser } = require("../controllers/user");
const router = express.Router();

router.route("/").post(createUser);

module.exports = router;
