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
            allowNull: true,
            type: DataTypes.DATE
        },
        psr_no: { //purchase order number
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        psr_date: { //purchase order date
            allowNull: true,
            type: DataTypes.DATE  //cannot be Sequelize.DATE(timestamp)
        },
        purchase_class: { //purchase class
            allowNull: true,
            type: DataTypes.STRING
        },
        purchase_typ: { //purchase type
            allowNull: true,
            type: DataTypes.STRING  
        },
        purchase_just: { //justification for purchase
            allowNull: true,
            type: DataTypes.STRING
        },
        date_req: {  //date required
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        project_title: {  //project title
            allowNull: true,
            type: DataTypes.STRING
        },
        vessel_code: {  //vessel code
            allowNull: true,
            type: DataTypes.STRING
        },
        delv: {  //address of buyer
            allowNull: true,
            type: DataTypes.STRING
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
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        date_approve: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
    }, {
        freezeTableName: true
    });

    return psr;
};

//some values allowNull:false but changed to true for developement