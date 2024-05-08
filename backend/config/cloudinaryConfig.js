const cloudinary = require('cloudinary').v2;

const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async function uploadToCloudinary(localFilePath) {
    const mainFolderName = "fullstackblog";


// const filePathOnCloudinary = path.join(mainFolderName, path.parse(localFilePath).base);
const filePathOnCloudinary = path.parse(localFilePath).base;

return cloudinary.uploader
  .upload(localFilePath, { public_id: mainFolderName + "/" + filePathOnCloudinary, resource_type: 'auto' })
  .then((result) => {
    fs.unlinkSync(localFilePath);
    return {
      message: "Success",
      url: result.secure_url,
    };
  })
  .catch((error) => {
    fs.unlinkSync(localFilePath);
    return { message: error };
  });
};
module.exports = cloudinaryUploader;

