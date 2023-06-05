const express = require('express');
const UploadController = require('../../controllers/upload-controller.js');
const DownloadController = require('../../controllers/download-controller.js');

const router = express.Router();

router.post('/upload',UploadController.upload);

router.get('/download/:id',DownloadController.download);

module.exports = router;