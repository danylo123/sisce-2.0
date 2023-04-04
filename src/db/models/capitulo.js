'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Capitulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Capitulo.belongsTo(models.Cidade, { foreignKey: 'cidadeId' })
      Capitulo.belongsTo(models.Regiao, { foreignKey: 'regiaoId' })
    }
  }
  Capitulo.init({
    numero: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    brasao: DataTypes.STRING,
    cidadeId: DataTypes.INTEGER,
    regiaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Capitulo',
  });
  return Capitulo;
};