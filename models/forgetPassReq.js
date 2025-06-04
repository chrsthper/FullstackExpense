import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

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

export default ForgetPassReq;