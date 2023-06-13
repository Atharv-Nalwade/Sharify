const { FileMapping } = require("../models/index.js");
const path = require("path");

class FileMappingRepository {
  async createMapping(data) {
    try {
      const mapping = await FileMapping.create(data);
    } catch (error) {
      console.log(
        "Somethng wen twrong in CreateMapping function of filemapping repo",
        error
      );
    }
  }

  async RetriveById(id, fieldToBeRetrived) {
    try {
      let retrivedField = await FileMapping.findOne({
        where: { nanoid: id },
        attributes: [fieldToBeRetrived],
      });
      retrivedField = retrivedField[fieldToBeRetrived];
      if (retrivedField) {
        return retrivedField;
      } else {
        console.log("File not found.");
        return null;
      }
    } catch (error) {
      console.log(
        "Something went wrong in RetriveById of filemapping repo",
        error
      );
      return null;
    }
  }
}

module.exports = FileMappingRepository;
