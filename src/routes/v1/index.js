const express = require('express');
const UploadController = require('../../controllers/upload-controller.js');
const DownloadController = require('../../controllers/download-controller.js');

const router = express.Router();

router.post('/upload',UploadController.upload);

router.get('/download/:filename',DownloadController.download);

module.exports = router;