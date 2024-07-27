const express = require('express');

const cloudinaryUploader = require('../config/cloudinaryConfig');
// const uploadFile = require("../controllers/file/file");
// const multer = require('multer');
const upload = require('../controllers/file/file');

const router = express.Router();



router.route('/').patch(upload.single('logo'), async (req, res) => {
        try {
                if (!req.file) {
                        return res.status(400).send('No file uploaded.');
                }

                const result = await cloudinaryUploader(
                        req.file.buffer,
                        req.file.originalname,
                );
                return res.send(result);
        } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                res.status(500).send('Error uploading file');
        }
});

module.exports = router;
