// src/data-access/db.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'flight_booking',
  process.env.DB_USER || 'user',
  process.env.DB_PASS || 'pass',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  }
);
