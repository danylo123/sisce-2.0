'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Priorado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Priorado.belongsTo(models.Regiao, { foreignKey: 'regiaoId' })
    }
  }
  Priorado.init({
    numero: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    brasao: DataTypes.STRING,
    regiaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Priorado',
  });
  return Priorado;
};