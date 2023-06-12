const AWS = require("aws-sdk");
const awsConfig = require("../config/awsConfig.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const DownloadService = require("../services/downloadService.js");

const downloadService = new DownloadService();

const s3 = awsConfig.s3;

const download = (req, res) => {
  const { id } = req.params;
  const options = req.body.options;
  const password = req.body.password;
  downloadService
    .downloadData(id,options,password)
    .then((data) => {
      const filename = path.basename(data.Key);

      if (!filename) {
        console.error("Error retrieving filename from S3");
        res.status(500).send("Error retrieving filename from S3");
        return;
      }

      res.attachment(filename);
      res.set("Content-Type", data.ContentType);
      res.send(data.Body);
    })
    .catch((err) => {
      console.error("Error retrieving file from S3:", err);
      res.status(500).json({
        success:false,
        data:{},
        msg:"File failed to donwload",
        error:err
      })
    });
};

module.exports = { download };
