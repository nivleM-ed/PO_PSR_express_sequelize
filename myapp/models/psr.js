//column needs to be changed

'use strict';
module.exports = (sequelize, DataTypes) => {
    var psr = sequelize.define('psr', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        psr_no: { //purchase order number
            allowNull: false,
            type: DataTypes.STRING
        },
        psr_date: { //purchase order date
            allowNull: true,
            type: DataTypes.STRING  //cannot be Sequelize.DATE(timestamp)
        },
        psr_ref: { //purchase order reference
            allowNull: true,
            type: DataTypes.STRING
        },
        delv_due: { //delivery due
            allowNull: true,
            type: DataTypes.STRING  //cannot be Sequelize.DATE(timestamp)
        },
        ship_mode: { //mode of shipment
            allowNull: true,
            type: DataTypes.STRING
        },
        psr_no: {  //purchase and service requisition
            allowNull: true,
            type: DataTypes.STRING
        },
        cca_no: {  //cca number
            allowNull: true,
            type: DataTypes.STRING
        },
        pay_mode: {  //mode of payment
            allowNull: true,
            type: DataTypes.STRING
        },
        address: {  //address of buyer
            allowNull: true,
            type: DataTypes.STRING(1000)
        },
        psr_desc: {
            type: DataTypes.JSON,
            allowNull: false
        },
        delete_req: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_t1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_t2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        date_pending: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_approve: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    return psr;
};

//some values allowNull:false but changed to true for developement