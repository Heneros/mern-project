
// function fileFilter(req, file, cb) {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only!"), false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("imageUrl");

// function uploadFunctionSingleImage(req, res) {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }
//     res.status(200).send({
//       message: "Image uploaded successfully",
//       image: `/${req.file.path}`,
//     });
//   });
// }
const path = require("path");
const multer = require("multer");
const fs = require("fs");


if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkImageType(file, cb){
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
  );

  const mimetype = filetypes.test(file.mimetype);


  if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Unsupported file format. You can only upload jpeg, jpg and png");
    }
}

const uploadFile = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: function(req, file, cb){
    checkImageType(file, cb);
  }
})


module.exports = uploadFile;
