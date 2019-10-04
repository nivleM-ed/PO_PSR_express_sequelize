'use strict';
module.exports = (sequelize, DataTypes) => {
    var purchase_order = sequelize.define('purchase_order', {
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
        po_no: { //purchase order number
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        po_date: { //purchase order date
            allowNull: true,
            type: DataTypes.DATE  //change to .DATE once moment.js work
        },
        po_ref: { //purchase order reference
            allowNull: true,
            type: DataTypes.STRING
        },
        delv_due: { //delivery due
            allowNull: true,
            type: DataTypes.DATE  //change to .DATE once moment.js work
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
            type: DataTypes.STRING
        },
        po_desc: {
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

    return purchase_order;
};

//some values allowNull:false but changed to true for developement