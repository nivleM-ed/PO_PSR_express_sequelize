let models = require('./models');
var sequelize = require('sequelize');

// exports.dbJoin_leave = function() {
//     //user can create many leaves
//     models.Users.hasMany(models.leave, {
//         as: 'leave',
//         foreignKey: 'user_id'
//     });
//     models.leave.belongsTo(models.Users, {
//         as: 'user',
//         foreignKey: 'user_id',
//         targetKey: 'id'
//     });

//     //approver for leaves
//     models.Users.hasMany(models.leave, {
//         as: 'leave2',
//         foreignKey: 'approver_id'
//     });
//     models.leave.belongsTo(models.Users, {
//         as: 'approver',
//         foreignKey: 'approver_id',
//         targetKey: 'id'
//     });
// }

// exports.dbJoin_po_psr = function() {
//     //po is dependant on psr
//     models.psr.hasOne(models.purchase_order, {
//         as: 'po',
//         foreignKey: 'psr_no'
//     });
//     models.purchase_order.belongsTo(models.psr, {
//         as: 'psr',
//         foreignKey: 'psr_no',
//         target: 'id'
//     });
// }

// exports.dbJoin_psr = function() {
//     //user can create psr (required:true -inner join)
//     models.Users.hasMany(models.psr, {
//         as: 'psr1',
//         foreignKey: 'create_user'
//     });
//     models.psr.belongsTo(models.Users, {
//         as: 'creator_user',
//         foreignKey: 'create_user',
//         targetKey: 'id'
//     });

//     //t2_user_1 for psr  (required:false -left join)
//     models.Users.hasMany(models.psr, {
//         as: 'psr2',
//         foreignKey: 't2_user_1'
//     });
//     models.psr.belongsTo(models.Users, {
//         as: 't2_user',
//         foreignKey: 't2_user_1',
//         targetKey: 'id'
//     });

//     //t2_user_2 for psr  (required:false -left join)
//     models.Users.hasMany(models.psr, {
//         as: 'psr3',
//         foreignKey: 't2_user_2'
//     });
//     models.psr.belongsTo(models.Users, {
//         as: 't2_user2',
//         foreignKey: 't2_user_2',
//         targetKey: 'id'
//     });

//     //approver for psr  (required:false -left join)
//     models.Users.hasMany(models.psr, {
//         as: 'psr4',
//         foreignKey: 'approver_user'
//     });
//     models.psr.belongsTo(models.Users, {
//         as: 'approver',
//         foreignKey: 'approver_user',
//         targetKey: 'id'
//     });

//     //del request for psr  (required:false -left join)
//     models.Users.hasMany(models.psr, {
//         as: 'psr5',
//         foreignKey: 'del_user'
//     });
//     models.psr.belongsTo(models.Users, {
//         as: 'del_req_user',
//         foreignKey: 'del_user',
//         targetKey: 'id'
//     });
// } 

// exports.dbJoin_po = function() {
//     //user can create po (required:true -inner join)
//     models.Users.hasMany(models.purchase_order, {
//         as: 'po1',
//         foreignKey: 'create_user'
//     });
//     models.purchase_order.belongsTo(models.Users, {
//         as: 'create_user_po',
//         foreignKey: 'create_user',
//         targetKey: 'id'
//     });

//     //t2_user_1 for po   (required:false -left join)
//     models.Users.hasMany(models.purchase_order, {
//         as: 'po2',
//         foreignKey: 't2_user_1'
//     });
//     models.purchase_order.belongsTo(models.Users, {
//         as: 't2_user_po',
//         foreignKey: 't2_user_1',
//         targetKey: 'id'
//     });

//     //t2_user_2 for po   (required:false -left join)
//     models.Users.hasMany(models.purchase_order, {
//         as: 'po3',
//         foreignKey: 't2_user_2'
//     });
//     models.purchase_order.belongsTo(models.Users, {
//         as: 't2_user2_po',
//         foreignKey: 't2_user_2',
//         targetKey: 'id'
//     });

//     //approver for po   (required:false -left join)
//     models.Users.hasMany(models.purchase_order, {
//         as: 'po4',
//         foreignKey: 'approver_user'
//     });
//     models.purchase_order.belongsTo(models.Users, {
//         as: 'approver_po',
//         foreignKey: 'approver_user',
//         targetKey: 'id'
//     });

//     //del request for po   (required:false -left join)
//     models.Users.hasMany(models.purchase_order, {
//         as: 'po5',
//         foreignKey: 'del_user'
//     });
//     models.purchase_order.belongsTo(models.Users, {
//         as: 'del_req_user_po',
//         foreignKey: 'del_user',
//         targetKey: 'id'
//     });
// }


//------------NEW ADDITION-------------------

exports.run_db = function() {
    //user can create many leaves
    models.Users.hasMany(models.leave, {
        as: 'leave',
        foreignKey: 'user_id'
    });
    models.leave.belongsTo(models.Users, {
        as: 'user_leave',
        foreignKey: 'user_id',
        targetKey: 'id'
    });

    //approver for leaves
    models.Users.hasMany(models.leave, {
        as: 'leave2',
        foreignKey: 'approver_id'
    });
    models.leave.belongsTo(models.Users, {
        as: 'approver_leave',
        foreignKey: 'approver_id',
        targetKey: 'id'
    });

    //----------------------------------------------------------

    //po is dependant on psr
    models.psr.hasOne(models.purchase_order, {
        as: 'po',
        foreignKey: 'psr_no'
    });
    models.purchase_order.belongsTo(models.psr, {
        as: 'psr',
        foreignKey: 'psr_no',
        target: 'id'
    });

    //-----------------------------------------------------------

    //user can create psr (required:true -inner join)
    models.Users.hasMany(models.psr, {
        as: 'psr1',
        foreignKey: 'create_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'create_user_psr',
        foreignKey: 'create_user',
        targetKey: 'id'
    });

    //t2_user_1 for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr2',
        foreignKey: 't2_user_1'
    });
    models.psr.belongsTo(models.Users, {
        as: 't2_user_psr',
        foreignKey: 't2_user_1',
        targetKey: 'id'
    });

    //t2_user_2 for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr3',
        foreignKey: 't2_user_2'
    });
    models.psr.belongsTo(models.Users, {
        as: 't2_user2_psr',
        foreignKey: 't2_user_2',
        targetKey: 'id'
    });

    //approver for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr4',
        foreignKey: 'approver_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'approver_psr',
        foreignKey: 'approver_user',
        targetKey: 'id'
    });

    //del request for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr5',
        foreignKey: 'del_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'del_req_user_psr',
        foreignKey: 'del_user',
        targetKey: 'id'
    });

    //------------------------------------------------------------

    //user can create po (required:true -inner join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po1',
        foreignKey: 'create_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'create_user_po',
        foreignKey: 'create_user',
        targetKey: 'id'
    });

    //t2_user_1 for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po2',
        foreignKey: 't2_user_1'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 't2_user_po',
        foreignKey: 't2_user_1',
        targetKey: 'id'
    });

    //t2_user_2 for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po3',
        foreignKey: 't2_user_2'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 't2_user2_po',
        foreignKey: 't2_user_2',
        targetKey: 'id'
    });

    //approver for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po4',
        foreignKey: 'approver_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'approver_po',
        foreignKey: 'approver_user',
        targetKey: 'id'
    });

    //del request for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po5',
        foreignKey: 'del_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'del_req_user_po',
        foreignKey: 'del_user',
        targetKey: 'id'
    });

}