const UploadService = require("../services/uploadService.js");

const uploadService = new UploadService();

const upload = (req, res) => {
  uploadService.uploadData(req, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      res.status(500).send("Error uploading file");
    } else {
      res.send("File uploaded successfully");
    }
  });
};

module.exports = {
  upload,
};