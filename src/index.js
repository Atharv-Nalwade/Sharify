const express = require('express');
const multer = require('multer');
const path = require('path')

const app = express();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', '/uploads');
    cb(null, uploadPath); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  }
});

const upload = multer({ storage: storage });

// Define the route to handle the file upload
app.post('/upload', upload.single('file'), function (req, res) {
  console.log(req.file); // Access the uploaded file details in the 'req.file' object
  res.send('File uploaded!');
});

// Start the server
app.listen(3000, function () {
  console.log('Server listening on port 3000');
});