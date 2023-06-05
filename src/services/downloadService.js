const AWS = require('aws-sdk');
const awsConfig = require('../config/awsConfig');

class DownloadService {
  constructor() {
    this.s3 = new AWS.S3(awsConfig); // Create an instance of the AWS S3 service
  }

  downloadData(filename) {
    const imagePatternRegex = /\.(jpe?g|png|gif|bmp|tiff?|ico|svg|webp)$/;
    const fileExtensionRegex = /\.(pdf|docx|pptx|xlsx|txt|csv|html|css|js|zip|rar|tar|gz|php|py|java|cpp|c|rb|swift|go)$/i;

    let folder;

    if (imagePatternRegex.test(filename)) {
      folder = 'images';
    } else if (fileExtensionRegex.test(filename)) {
      folder = 'files';
    } else {
      folder = 'miscellaneous';
    }

    const filePath = `${folder}/${filename}`;
    console.log(filePath);

    const params = {
      Bucket: process.env.Bucket,
      Key: filePath,
    };

    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = DownloadService;
