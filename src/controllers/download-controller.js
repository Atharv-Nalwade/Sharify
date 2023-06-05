const AWS = require("aws-sdk");
const awsConfig = require("../config/awsConfig.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const DownloadService = require("../services/downloadService.js");

const downloadService = new DownloadService();

const s3 = awsConfig.s3;

const download = (req, res) => {
  const { filename } = req.params;

  downloadService
    .downloadData(filename)
    .then((data) => {
      // Set the appropriate headers and send the file to the client
      res.attachment(filename);
      res.set("Content-Type", data.ContentType);
      res.send(data.Body);
    })
    .catch((err) => {
      console.error("Error retrieving file from S3:", err);
      res.status(500).send("Error retrieving file from S3");
    });
};

module.exports = { download };
