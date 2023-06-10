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

  async createFileMapping(nanoid, Path,Password,Option) {
    try {
      console.log(Password,Option);
      await this.fileMappingRepository.createMapping({
        nanoid,
        file_path: Path,
        password: Password,
        options: Option,
      });
    } catch (err) {
      throw err;
    }
  }

  async uploadData(Incomingfile,password,option) {
    try {
      const nanoid = await this.generateId();
      // console.log("Password:", password);
      // console.log("Option:", option);
  
      const file = Incomingfile;
      const path = file.location; // Use `file.location` instead of `file.key`
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
