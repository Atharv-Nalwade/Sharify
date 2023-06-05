const AwsConfig = require("../config/awsConfig.js");

class UploadService {

  async uploadData(file, callback) {
    console.log(file, callback);
    AwsConfig.upload.single("file")(file, null, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        callback("Error uploading file");
      } else {
        console.log("File uploaded successfully");
        callback(null);
      }
    });
  }
  
}

module.exports = UploadService;
