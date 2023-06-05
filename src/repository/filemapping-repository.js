const { FileMapping } = require('../models/index.js');


class FileMappingRepository{

async createMapping(data){
    try {
        const mapping = await FileMapping.create(data);
        console.log(mapping);
    } catch (error) {
        console.log("Somethng wen twrong in CreateMapping function of filemapping repo");
    }
}

}

module.exports = FileMappingRepository;