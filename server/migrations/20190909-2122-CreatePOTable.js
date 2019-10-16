//created by nivleM
//created on 9 September 2019
//Table Name: purchase_order

//updated on 17 September
//UPDATES:
//add new columns to fulfill requirements

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
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }, //needed
            po_no: { //purchase order number
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            po_date: { //purchase order date
                allowNull: true,
                type: Sequelize.DATE //change to .DATE once moment.js work
            },
            po_ref: { //purchase order reference
                allowNull: true,
                type: Sequelize.STRING
            },
            quotation: { //quotation
                allowNull: true,
                type: Sequelize.STRING
            },
            delv_due: { //delivery due
                allowNull: true,
                type: Sequelize.DATEONLY //change to .DATE once moment.js work
            },
            ship_mode: { //mode of shipment
                allowNull: true,
                type: Sequelize.STRING
            },
            psr_no: { //purchase and service requisition
                allowNull: true,
                type: Sequelize.STRING
            },
            cca_no: { //cca number
                allowNull: true,
                type: Sequelize.STRING
            },
            pay_mode: { //mode of payment
                allowNull: true,
                type: Sequelize.STRING
            },
            address: { //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            po_desc: {
                type: Sequelize.JSON, //json file
                allowNull: false //expected format   {quantity:quantity,description:"description",price:price,total:total}
            },
            delete_req: {
                type: Sequelize.BOOLEAN, //request for deletion
                defaultValue: false,
                allowNull: false
            },
            status_t1: { //everyone can see
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t2: { //for manager to set to pending
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            date_pending: { //for higher ups to approve
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            date_approve: {
                type: Sequelize.DATEONLY,
                allowNull: true
            }
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('purchase_order');
    }
};