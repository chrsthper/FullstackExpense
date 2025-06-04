import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const order = sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  paymentId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  status: Sequelize.STRING
});

export default order;