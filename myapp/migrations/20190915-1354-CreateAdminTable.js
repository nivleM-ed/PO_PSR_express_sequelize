//created by nivleM
//created on 15 September 2019
//Table Name: purchase_order

//for the sake of developement allowNull: true

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('admin', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updateAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            username: { //purchase order number
                allowNull: false,
                type: Sequelize.STRING
            },
            password: { //purchase order date
                allowNull: true,
                type: Sequelize.STRING  //cannot be Sequelize.DATE(timestamp)
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('admin');
    }
};

