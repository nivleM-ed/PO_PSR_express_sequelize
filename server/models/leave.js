'use strict';
module.exports = (sequelize, DataTypes) => {
    var leave = sequelize.define('leave', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id: { //purchase order id (references id from purchase_order)
            allowNull: false,
            type: DataTypes.STRING
        },
        date_from: { //purchase order date
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        date_to: { //purchase order date
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        reason: { //purchase order date
            allowNull: false,
            type: DataTypes.STRING(1000)
        },
        status: { //purchase order date
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        freezeTableName: true
    });

    return leave;
};