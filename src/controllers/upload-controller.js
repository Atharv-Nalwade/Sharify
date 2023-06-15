const UploadService = require("../services/UploadService");
const uploadService = new UploadService();

const uploadController = async (req, res) => {
  try {
    const serviceReturnPayload = await uploadService.uploadData(req.file, req.body.password, req.body.option);
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
      msg: "Failed to upload the file",
      error: err,
    });
  }
};

module.exports = {
  uploadController,
};
