const multer = require('multer');
const path = require('path');
// const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, '../public/uploads'));
//   },
//   filename(req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     // cb(err, false);
//     cb(null, false);
//   }
// };

// const uploadPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fieldSize: 2000000 },
// });

// const uploadMultiplePhoto = uploadPhoto.fields([
//   { name: 'images', maxCount: 10 },
// ]);

// const productImgResize = async(req, res, next) => {
//     if(!req.files) return next();
//     await Promise.all(req.files.map(async(file) => {
//         await sharp(file.path)
//             .resize(300,300)
//             .toFormat("jpeg")
//             .jpeg({quality: 90})
//             .toFile(`public/uploads/products/${file.filename}`)
//         })
//     );
//     next();
// };

const multerStorageSingle = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/banners'));
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  },
});

const multerFilterSingle = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    req.session.imageValidationError = 'Unsupported image file format.';
    // cb(err, false);
    cb(null, false);
  }
};

const uploadSinglePhoto = multer({
  storage: multerStorageSingle,
  fileFilter: multerFilterSingle,
  limits: { fieldSize: 2000000 },
}).single('image');

module.exports = { uploadSinglePhoto };