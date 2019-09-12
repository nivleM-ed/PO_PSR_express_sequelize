'use strict';
module.exports = (sequelize, DataTypes) => {
    var Lead = sequelize.define('purchase_order_data', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        po_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }
    });

    return purchase_order_data;
};