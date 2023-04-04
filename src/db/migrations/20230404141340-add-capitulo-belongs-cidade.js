'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Capitulos', 'cidadeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Cidades',
        key: 'id'
      },
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Capitulos', 'cidadeId')
  }
};
