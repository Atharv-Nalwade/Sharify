const { FileMapping } = require("../models/index.js");
const path = require('path');

class FileMappingRepository {

  async createMapping(data) {
    try {
      const mapping = await FileMapping.create(data);
      console.log(mapping);
    } catch (error) {
      console.log(
        "Somethng wen twrong in CreateMapping function of filemapping repo"
      );
    }
  }

async RetriveById(id) {
    try {
      const mapping = await FileMapping.findOne({
        where: {
          nanoid: id,
        },
      });
      if (mapping) {
        const filePath = mapping.file_path;
        return filePath;
      } else {
        console.log("File not found.");
        return null;
      }
    } catch (error) {
      console.log("Something went wrong in RetriveById of filemapping repo", error);
      return null;
    }
  }
  
}

module.exports = FileMappingRepository;