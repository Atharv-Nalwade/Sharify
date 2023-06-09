const { upload } = require("../config/awsConfig.js");
const FileMappingRepository = require("../repository/filemapping-repository.js");

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

  async uploadFile(file) {
    return new Promise((resolve, reject) => {
      upload.single("file")(file, null, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          reject(err);
        } else {
          const path = file.file.key;
          console.log("File uploaded successfully");
          resolve(path);
        }
      });
    });
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

  async uploadData(file) {
    const nanoid = await this.generateId();
    const path = await this.uploadFile(file);
    await this.createFileMapping(nanoid, path);

    return {
      id: nanoid,
    };
  }
}

module.exports = UploadService;
