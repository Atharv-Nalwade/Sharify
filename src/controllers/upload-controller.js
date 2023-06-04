const express = require('express');
const AwsConfig = require('../config/awsConfig.js');

const upload = async (req,res)=>{
    AwsConfig.upload.single("file")(req, res, (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).send('Error uploading file');
        }
        
        console.log('File uploaded successfully');
        res.send('File uploaded successfully');
      });
}

module.exports={
    upload
}