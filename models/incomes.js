import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const incomes = sequelize.define('incomes', {
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

export default incomes;