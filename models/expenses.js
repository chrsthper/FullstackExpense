import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const expenses = sequelize.define('expenses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  date: Sequelize.STRING,
  time: Sequelize.STRING
});

export default expenses;