const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const ForgetPassReq = sequelize.define('forgetPassReqs',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
       // autoIncrement: false,
        primaryKey: true
    },
    isActive: Sequelize.BOOLEAN
})

module.exports = ForgetPassReq;