const express = require("express");

const router = express.Router();
const uploadFunctionSingleImage = require("../controllers/file");

router.route("/uploads").post(uploadFunctionSingleImage);

module.exports = router;
