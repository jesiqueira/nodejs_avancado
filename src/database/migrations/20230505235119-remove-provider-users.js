'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.removeColumn('users', 'provaider')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'provaider', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        })
    },
}
