const multer = require('multer');
const path = require('path');

const storage = multer({ storage: multer.memoryStorage() });

function checkImageType(file, cb) {
  // console.log('Checking file:', file.originalname, 'MIME type:', file.mimetype);

  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Unsupported file format. You can only upload jpeg, jpg and png');
  }
}


const upload = multer(
  {
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 },
    fileFilter: function (req, file, cb) {
      checkImageType(file, cb)
    }
  })

module.exports = upload;
