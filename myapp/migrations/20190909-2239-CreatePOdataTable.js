//created by nivleM
//created on 9 September 2019
//Table Name: purchase_order_data

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('purchase_order', {
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
            po_id: { //purchase order id (references id from purchase_order)
                allowNull: false,
                type: Sequelize.STRING
            },
            desc: { //purchase order date
                allowNull: false,
                type: Sequelize.STRING(1000)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('purchase_order');
    }
};

