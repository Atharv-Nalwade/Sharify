const express = require('express');
const multer = require('multer');
const UploadController = require('../../controllers/upload-controller.js');
const DownloadController = require('../../controllers/download-controller.js');

const router = express.Router();

const upload = require('../../config/awsConfig.js').upload;


router.post('/upload', upload.single('file'),UploadController.uploadController);


router.get('/download/:id',DownloadController.download);

module.exports = router;