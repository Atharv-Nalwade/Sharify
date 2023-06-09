const UploadService = require("../services/uploadService.js");

const uploadService = new UploadService();

const upload = async (req, res) => {
  try {
    const serviceReturnPayload = await uploadService.uploadData(req);
    res.status(200).json({
      success: true,
      data: serviceReturnPayload,
      msg: "File uploaded successfully",
      error: {},
    });
  } catch (err) {
    console.error("File upload failed:", err);
    res.status(500).json({
      success: false,
      data: {},
      msg: "File failed to upload",
      error: err,
    });
  }
};

module.exports = {
  upload,
};
