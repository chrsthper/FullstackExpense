import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING,
  isPremiumUser: Sequelize.BOOLEAN,
  totalExpense: Sequelize.STRING,
  totalIncome: Sequelize.STRING
});

export default User;