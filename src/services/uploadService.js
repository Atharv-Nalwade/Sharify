const FileMappingRepository = require("../repository/filemapping-repository");

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

  async createFileMapping(nanoid, path) {
    try {
      await this.fileMappingRepository.createMapping({
        nanoid,
        file_path: path,
      });
    } catch (err) {
      throw err;
    }
  }

  async uploadData(Incomingfile,password,option) {
    try {
      const nanoid = await this.generateId();
      // console.log(req.file);
      // Log other fields
      //  let Password = req.body.password;
      //  let Option = option;
      console.log("Password:", password);
      console.log("Option:", option);
      // console.log("Option:", Option);
  
      const file = Incomingfile;
      const path = file.location; // Use `file.location` instead of `file.key`
      console.log("File uploaded successfully");
  
      await this.createFileMapping(nanoid, path);
  
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
