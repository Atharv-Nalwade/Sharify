const express = require('express');
const multer = require('multer');
const UploadController = require('../../controllers/upload-controller.js');
const DownloadController = require('../../controllers/download-controller.js');
const JSZip = require('jszip');
const fs = require('fs');
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
      console.log("Original", req.file.buffer.length);

      try {
        const fileBuffer = req.file.buffer;

        const zip = new JSZip();
        zip.file(req.file.originalname, fileBuffer);

        const compressedBuffer = await zip.generateAsync({ type: 'nodebuffer' });
        console.log("Compressed", compressedBuffer.length);

        const filePath = `files/${req.file.originalname}.zip`;

        const uploadParams = {
          Bucket: process.env.Bucket,
          Key: filePath,
          Body: compressedBuffer,
          ContentType: 'application/zip',
        };

        const s3Upload = s3.upload(uploadParams).promise();
        const s3Data = await s3Upload;

        req.file.location = s3Data.Location;
        req.file.originalname = req.file.originalname + '.zip';

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
