const express = require('express');
const multer = require('multer');
const UploadController = require('../../controllers/upload-controller.js');
const DownloadController = require('../../controllers/download-controller.js');
const zlib = require('zlib');
const { s3 } = require('../../config/awsConfig.js');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const customUploadMiddleware = async (req, res, next) => {
    try {
      upload.single('file')(req, res, async function (err) {
        if (err) {
          return next(err);
        }
        console.log("Original",req.file.buffer.length)
        // File upload successful, now compress the uploaded file
        try {
          const fileBuffer = req.file.buffer;
          const compressedBuffer = zlib.gzipSync(fileBuffer);
          console.log("Compressed",compressedBuffer.length)
  
          const filePath = `files/${req.file.originalname}.gz`; // Include the .gz extension in the file path
  
          const uploadParams = {
            Bucket: process.env.Bucket,
            Key: filePath,
            Body: compressedBuffer,
            ContentEncoding: 'gzip',
            ContentType: req.file.mimetype,
          };
  
          const s3Upload = s3.upload(uploadParams).promise();
          const s3Data = await s3Upload;
  
          req.file.location = s3Data.Location; // Update the file location with the S3 file path
          req.file.originalname = req.file.originalname + '.gz'; // Update the original name with the .gz extension
  
          next();
        } catch (err) {
          next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  };


  
  
  
  

router.post('/upload', customUploadMiddleware, UploadController.uploadController);
router.get('/download/:id', DownloadController.download);

module.exports = router;
