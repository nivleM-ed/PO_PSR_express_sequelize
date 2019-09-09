//created by nivleM
//created on 9 September 2019
//Table Name: purchase_order

//for the sake of developement allowNull: true

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
            po_no: { //purchase order number
                allowNull: false,
                type: Sequelize.STRING
            },
            po_date: { //purchase order date
                allowNull: true,
                type: Sequelize.STRING  //cannot be Sequelize.DATE(timestamp)
            },
            po_ref: { //purchase order reference
                allowNull: true,
                type: Sequelize.STRING
            },
            delv_due: { //delivery due
                allowNull: true,
                type: Sequelize.STRING  //cannot be Sequelize.DATE(timestamp)
            },
            ship_mode: { //mode of shipment
                allowNull: true,
                type: Sequelize.STRING
            },
            psr_no: {  //purchase and service requisition
                allowNull: true,
                type: Sequelize.STRING
            },
            cca_no: {  //cca number
                allowNull: true,
                type: Sequelize.STRING
            },
            pay_mode: {  //mode of payment
                allowNull: true,
                type: Sequelize.STRING
            },
            address: {  //address of buyer
                allowNull: true,
                type: Sequelize.STRING(1000)
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('purchase_order');
    }
};

