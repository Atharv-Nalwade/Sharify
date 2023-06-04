const AWS = require("aws-sdk");
const awsConfig = require("../config/awsConfig.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const s3 = awsConfig.s3;

const download = async (req, res) => {
  const { filename } = req.params;
  // const filePath = 'images/'+filename;

  const imagePatternRegex = /\.(jpe?g|png|gif|bmp|tiff?|ico|svg|webp)$/;  
  const fileExtensionRegex =
    /\.(pdf|docx|pptx|xlsx|txt|csv|html|css|js|zip|rar|tar|gz|php|py|java|cpp|c|rb|swift|go)$/i;

  let folder;

  if (imagePatternRegex.test(filename)) {
    folder = "images";
  } else if (fileExtensionRegex.test(filename)) {
    folder = "files";
  } else {
    folder = "miscellaneous";
  }

  filePath = `${folder}/${filename}`;
  console.log(filePath)
  const params = {
    Bucket: process.env.Bucket,
    Key: filePath, // Update the Key to include the "images" folder
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error retrieving file from S3");
    }

    res.attachment(filename);
    res.set("Content-Type", data.ContentType);
    res.send(data.Body);
  });
};

module.exports = { download };
