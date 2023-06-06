const UploadService = require("../services/uploadService.js");

const uploadService = new UploadService();

const upload = (req,res)=>{
  uploadService.uploadData(req).then((serviceReturnPayload)=>{
    res.status(200).json({
      success:true,
      data:serviceReturnPayload,
      msg:"File uploaded sucessfully",
      error:{}
    })
  }).catch((err)=>{
    res.status(500).json({
      success:false,
      data:{},
      msg:"File failed to upload",
      error:err
    })
  })
}

module.exports = {
  upload
};


/*
res.status(500).json({
        success:true,
        data:serviceReturnPayload,
        msg:"File uploaded sucessfully",
        error:{}
      })
      */