//created by nivleM
//created on 14 September 2019
//Table Name: psr

//for the sake of developement allowNull: true
//column name needs to be changed

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('psr', {
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
            psr_no: { //purchase order number
                allowNull: false,
                type: Sequelize.STRING
            },
            psr_date: { //purchase order date
                allowNull: true,
                type: Sequelize.STRING  //cannot be Sequelize.DATE(timestamp)
            },
            psr_ref: { //purchase order reference
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
            },
            psr_desc: {
                type: Sequelize.JSON,
                allowNull: false
            },
            delete_req: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t1: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t2: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            date_pending: {
                type: Sequelize.STRING,
                allowNull: true
            },
            date_approve: {
                type: Sequelize.STRING,
                allowNull: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('psr');
    }
};

