const UploadService = require("../services/uploadService.js");

const uploadService = new UploadService();

// const upload = (req, res) => {
//   uploadService.uploadData(req, (err) => {
//     if (err) {
//       console.error("Error uploading file:", err);
//       res.status(500).send("Error uploading file");
//     } else {
//       res.send("Done");
//     }
//   });
// };

const upload = (req,res)=>{
  uploadService.uploadData(req).then((serviceReturnPayload)=>{
    res.status(500).json({
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