const UploadService = require("../services/uploadService.js");
const { upload } = require("../config/awsConfig");

const uploadService = new UploadService();


const uploadController = async (req, res) => {
  try {
    // Use the 'upload' middleware to handle the file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          data: {},
          msg: "File failed to upload",
          error: err.message,
        });
      }

      const file = req.file;


      // Pass the file to the upload service for further processing
      const serviceReturnPayload = await uploadService.uploadData(file);

      res.status(200).json({
        success: true,
        data: serviceReturnPayload,
        msg: "File uploaded successfully-- Msg from Controller",
        error: {},
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: {},
      msg: "File failed to upload",
      error: err,
    });
  }
};

module.exports = uploadController;
