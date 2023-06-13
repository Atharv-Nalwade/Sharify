const FileMappingRepository = require("../repository/filemapping-repository.js");
const {hashedPasswordGenerator} = require("../helpers/password-helper.js");

class UploadService {
  constructor() {
    this.fileMappingRepository = new FileMappingRepository();
  }

  async generateId() {
    try {
      const idGeneratorModule = await import("../helpers/idGenerator.mjs");
      const idGenerator = idGeneratorModule.generateId;
      return idGenerator();
    } catch (err) {
      console.log("Some error occurred\n" + err);
      throw err;
    }
  }

  async createFileMapping(nanoid, Path,Password,Option) {
    try {
      console.log("Password",Password);
      let hashedPassword = null;
      if(Option==='password'){
       hashedPassword = await hashedPasswordGenerator(Password);
      }
      await this.fileMappingRepository.createMapping({
        nanoid,
        file_path: Path,
        password: hashedPassword,
        options: Option,
      });
    } catch (err) {
      throw err;
    }
  }

  async uploadData(Incomingfile,password,option) {
    try {
      const nanoid = await this.generateId();
     
      const file = Incomingfile;
      // const path = file.location; // Using `file.location` instead of `file.key`
      const path = decodeURI(file.location.substring(file.location.indexOf(".amazonaws.com/") + 15));
      
      
      console.log("File uploaded successfully");
    
      await this.createFileMapping(nanoid, path,password,option);
  
      return {
        id: nanoid,
      };
    } catch (err) {
      console.error("Error uploading data:", err);
      throw err;
    }
  }
  
}

module.exports = UploadService;
