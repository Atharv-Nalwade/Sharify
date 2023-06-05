const AwsConfig = require("../config/awsConfig.js");
const FileMappingRepository = require('../repository/filemapping-repository.js');

class UploadService {

  constructor(){
   this.fileMappingRepository = new FileMappingRepository();
  }


  // async uploadData(file, callback) {

  //   let nanoid;
  //   let path;
  //   let serviceReturnPayload;

  //   const importIdGenerator = async () => {
  //     try {
  //       const idGenerator = await import("../helpers/idGenerator.mjs");
  //       nanoid = idGenerator.generateId();
  //     } catch (err) {
  //       console.log("Some error occurred\n" + err);
  //     }
  //   };
  //   await importIdGenerator();

  //   const AwsUploader = new Promise((res,rej)=>{
  //     AwsConfig.upload.single("file")(file, null, (err) => {
  //       if (err) {
  //         console.error("Error uploading file:", err);
  //         callback("Error uploading file");
  //       } else {
  //         path = file.file.key;
  //         console.log("File uploaded successfully");
  //         callback(null);
  //         res();
  //       }
  //     });
  //   }) 
 
  //  AwsUploader.then(async ()=>{
  //   await this.fileMappingRepository.createMapping({ nanoid, file_path: path });
  //  })

  //  return new Promise((res,rej)=>{
  //     serviceReturnPayload={
  //       id:nanoid
  //     }
  //     if(serviceReturnPayload === null || typeof serviceReturnPayload  === 'undefined') {
  //      rej() 
  //     }else{
  //       res(serviceReturnPayload);
  //     }
  //  })
    
  // }

  async uploadData(file) {
    let nanoid;
    let path;
    let serviceReturnPayload;
  
    const importIdGenerator = async () => {
      try {
        const idGenerator = await import("../helpers/idGenerator.mjs");
        nanoid = idGenerator.generateId();
      } catch (err) {
        console.log("Some error occurred\n" + err);
      }
    };
    await importIdGenerator();
  
    const AwsUploader = new Promise((resolve, reject) => {
      AwsConfig.upload.single("file")(file, null, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          reject(err); // Reject the promise with the error
        } else {
          path = file.file.key;
          console.log("File uploaded successfully");
          resolve(); // Resolve the promise without any value
        }
      });
    });
  
    return new Promise((resolve, reject) => {
      AwsUploader.then(async () => {
        await this.fileMappingRepository.createMapping({
          nanoid,
          file_path: path,
        });
        serviceReturnPayload = {
          id: nanoid,
        };
        if (!serviceReturnPayload) {
          reject(); // Reject the promise if serviceReturnPayload is null or undefined
        } else {
          resolve(serviceReturnPayload); // Resolve the promise with the serviceReturnPayload
        }
      }).catch(reject);
    });
  }
  


}

module.exports = UploadService;
