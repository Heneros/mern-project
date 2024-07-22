// const path = require("path");
// const multer = require("multer");
// const fs = require("fs");


// if (!fs.existsSync("./uploads")) {
//     fs.mkdirSync("./uploads");
// }


// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkImageType(file, cb){
//   const filetypes = /jpeg|jpg|png/;
//   const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//   );

//   const mimetype = filetypes.test(file.mimetype);


//   if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb("Unsupported file format. You can only upload jpeg, jpg and png");
//     }
// }

// const uploadFile = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 },
//   fileFilter: function(req, file, cb){
//     checkImageType(file, cb);
//   }
// })


// module.exports = uploadFile;
// config/multerConfig.js
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

function checkImageType(file, cb) {
  console.log('Checking file:', file.originalname, 'MIME type:', file.mimetype);

  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Unsupported file format. You can only upload jpeg, jpg and png");
  }
}

const uploadFile = multer({
  storage,
  limits: { fileSize: 5024 * 5024 },
  fileFilter: function (req, file, cb) {
    checkImageType(file, cb);
  }
});

module.exports = uploadFile;
