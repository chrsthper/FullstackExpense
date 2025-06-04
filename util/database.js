import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';

// Tentukan env file mana yang akan digunakan
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`⚠️  Warning: ${envFile} not found, fallback to default .env`);
  dotenv.config();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    logging: false
  }
);

export default sequelize;