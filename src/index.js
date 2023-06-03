const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();

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
      cb(null, destinationPath);
    },
  }),
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("File uploaded succesfully");
  res.send("File uploaded successfully");
});

app.get("/download/:filename", function (req, res) {
  const params = {
    Bucket: process.env.Bucket,
    Key: req.params.filename,
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error retrieving image from S3");
    }
    console.log(req.params.filename);
    res.attachment(req.params.filename); // Set the attachment disposition
    res.set("Content-Type", data.ContentType); // Set the appropriate content type based on the file's content type
    res.send(data.Body); // Send the file data as a download
  });
});

app.listen(3000, () => {
  console.log("Started server on port 3000");
});
