'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FileMapping.init({
    nanoid: DataTypes.STRING,
    file_path: DataTypes.STRING,
    password: DataTypes.STRING,
    options: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FileMapping',
  });
  return FileMapping;
};