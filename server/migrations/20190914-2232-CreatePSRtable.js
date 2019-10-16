//created by nivleM
//created on 14 September 2019
//Table Name: psr

//Updated on 17 September 2019
//UPDATES:
//added columns to fullfill requirements

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
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            psr_no: { //purchase order number
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            psr_date: { //purchase order date
                allowNull: true,
                type: Sequelize.DATE  //cannot be Sequelize.DATE(timestamp)
            },
            purchase_class: { //purchase class
                allowNull: true,
                type: Sequelize.STRING
            },
            purchase_typ: { //purchase type
                allowNull: true,
                type: Sequelize.STRING  
            },
            purchase_just: { //justification for purchase
                allowNull: true,
                type: Sequelize.STRING
            },
            date_req: {  //date required
                allowNull: true,
                type: Sequelize.DATEONLY  //cannot be Sequelize.DATE(timestamp)
            },
            project_title: {  //project title
                allowNull: true,
                type: Sequelize.STRING
            },
            vessel_code: {  //vessel code
                allowNull: true,
                type: Sequelize.STRING
            },
            delv: {  //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            psr_desc: {
                type: Sequelize.JSON,   //json file
                allowNull: false        // expected format {desc:desc,qty:qty,unit:unit,cost_code:cost_code,remarks:"remarks"}
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
        return queryInterface.dropTable('psr');
    }
};

