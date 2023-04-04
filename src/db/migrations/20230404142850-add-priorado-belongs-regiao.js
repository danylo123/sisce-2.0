'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Priorados', 'regiaoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Regiaos',
        key: 'id'
      },
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Priorados', 'regiaoId')
  }
};
