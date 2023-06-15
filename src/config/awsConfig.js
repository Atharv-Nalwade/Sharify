const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey,
  region: process.env.Region,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.Bucket,
    contentEncoding: 'gzip',
    key: function (req, file, cb) {
      const contentType = file.mimetype;
      const imagePatternRegex = /^image\/[a-zA-Z+-]+$/;
      const fileExtensionRegex =
        /\.(pdf|docx|pptx|xlsx|txt|csv|html|css|js|zip|rar|tar|gz|php|py|java|cpp|c|rb|swift|go)$/i;

      let folder;

      if (imagePatternRegex.test(contentType)) {
        folder = "images";
      } else if (fileExtensionRegex.test(file.originalname)) {
        folder = "files";
      } else {
        folder = "miscellaneous";
      }

      const destinationPath = `${folder}/${file.originalname}`;
      cb(null, destinationPath); // Remove the .gz extension from the destination path
    },
  }),
});


module.exports = {
  upload,
  s3,
};
