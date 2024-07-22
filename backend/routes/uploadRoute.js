const express = require("express");


const cloudinaryUploader = require("../config/cloudinaryConfig");
// const uploadFile = require("../controllers/file/file");
const multer = require("multer");


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.route("/").patch(upload.single("logo"), async (req, res) => {
        try {
                if (!req.file) {
                        return res.status(400).send("No file uploaded.");
                }

                const result = await cloudinaryUploader(req.file.buffer, req.file.originalname);
                res.send(result);
        } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
                res.status(500).send("Error uploading file");
        }
});

module.exports = router;
