const AwsConfig = require("../config/awsConfig.js");
const FileMappingRepository = require('../repository/filemapping-repository.js');

class UploadService {

  constructor(){
   this.fileMappingRepository = new FileMappingRepository();
  }


  async uploadData(file, callback) {

    let nanoid;
    let folder, filename,path;

    const importIdGenerator = async () => {
      try {
        const idGenerator = await import("../helpers/idGenerator.mjs");
        nanoid = idGenerator.generateId();
      } catch (err) {
        console.log("Some error occurred\n" + err);
      }
    };
    await importIdGenerator();

    const AwsUploader = new Promise((res,rej)=>{
      AwsConfig.upload.single("file")(file, null, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          callback("Error uploading file");
        } else {
          path = file.file.key;
          folder = file.file.key.split("/")[0];
          filename = file.file.key.split("/")[1];
          console.log("File uploaded successfully");
          callback(null);
          res();
        }
      });
    }) 
 
   AwsUploader.then(async ()=>{
    console.log(nanoid,path);
    await this.fileMappingRepository.createMapping({ nanoid, file_path: path })
    console.log("After await");
   })
    
  }


}

module.exports = UploadService;
