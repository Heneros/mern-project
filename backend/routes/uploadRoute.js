const express = require("express");

const router = express.Router();
const uploadFunctionSingleImage = require("../controllers/file");

router.route("/").post(uploadFunctionSingleImage);

module.exports = router;
