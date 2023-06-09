const FileMappingRepository = require('../repository/filemapping-repository.js');

class UploadService {
  constructor() {
    this.fileMappingRepository = new FileMappingRepository();
  }

  async uploadData(file) {
    console.log(file);
    let nanoid;
    let path;
    let serviceReturnPayload;

    const importIdGenerator = async () => {
      try {
        const idGenerator = await import('../helpers/idGenerator.mjs');
        nanoid = idGenerator.generateId();
      } catch (err) {
        console.log('Some error occurred\n' + err);
      }
    };
    await importIdGenerator();

    path = file.key;
    console.log('File uploaded successfully');

    // Store the mapping in the database
    try {
      await this.fileMappingRepository.createMapping({
        nanoid,
        file_path: path,
      });
      serviceReturnPayload = {
        id: nanoid,
      };
    } catch (err) {
      throw err;
    }

    return serviceReturnPayload;
  }
}

module.exports = UploadService;
