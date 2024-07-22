const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

const streamifier = require('streamifier');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async function uploadToCloudinary(fileBuffer, originalname) {
  const mainFolderName = "fullstackblog";
  const fileName = path.parse(originalname).name;
  const uniqueFileName = `${fileName}_${Date.now()}`;

  const filePathOnCloudinary = mainFolderName + "/" + uniqueFileName;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: filePathOnCloudinary, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          message: "Success",
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = cloudinaryUploader;