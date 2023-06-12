const path = require('path');
const AWS = require('aws-sdk');
const awsConfig = require('../config/awsConfig');
const FileMapping = require('../repository/filemapping-repository.js');
const { passwordVerify } = require('../helpers/password-helper.js');

class DownloadService {
  constructor() {
    this.s3 = new AWS.S3(awsConfig); // Create an instance of the AWS S3 service
    this.filemappingRepository = new FileMapping();
  }

  async downloadData(id,options,password) {
    if(options === "password"){
       const hashedPassword = await this.filemappingRepository.RetrivePasswordById(id);
        const passwordMatch = await passwordVerify(password,hashedPassword);
        if(!passwordMatch){ 
          throw new Error("Password is incorrect");
        }   
    }
    const filePath = await this.filemappingRepository.RetriveFilePathId(id);
  
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
          data.Key = filePath; // Including the Key property in the response
          resolve(data);
        }
      });
    });
  }
  
  
}

module.exports = DownloadService;
