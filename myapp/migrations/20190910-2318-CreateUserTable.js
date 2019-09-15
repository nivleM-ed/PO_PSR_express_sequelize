'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            firstname: {
                allowNull: true,
                type: Sequelize.STRING
            },
            lastname: {
                allowNull: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING
            },
            t1: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t2: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t3: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};


