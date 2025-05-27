const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ForgetPassReq = sequelize.define('forgetPassReqs', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  isActive: Sequelize.BOOLEAN,
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = ForgetPassReq;
