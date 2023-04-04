'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Usuarios', 'capituloId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Capitulos',
        key: 'id'
      },
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Usuario', 'capituloId')
  }
};
