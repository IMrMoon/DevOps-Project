// src/data-access/flightsDataAccess.js
import { sequelize } from './db.js';
import './flightsModel.js';
import './ordersModel.js';

export async function initDb(retries = 10, delay = 2000) {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to DB');
      await sequelize.sync({ alter: true });
      return;
    } catch (err) {
      console.error('❌ DB connection failed:', err.message);
      retries--;
      console.log(`🔁 Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('❌ Could not connect to the database after multiple attempts');
}
