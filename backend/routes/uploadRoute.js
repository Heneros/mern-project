const express = require("express");



const cloudinaryUploader = require("../config/cloudinaryConfig");
const uploadFile = require("../controllers/file");


const router = express.Router();

router.route("/").patch(uploadFile.single("logo"), async(req, res) =>{
        const localFilePath = req.file.path;
        const result = await cloudinaryUploader(localFilePath);
         console.log(result)

        res.send(result.url);
});

module.exports = router;
