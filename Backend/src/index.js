// src/index.js
import dotenv from 'dotenv';
import express, { json } from 'express';
import flightsRoutes from './routes/flightsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

import { initDb } from './data-access/flightsDataAccess.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
    console.log('PORT:', PORT);


app.use(json());
app.use('/', flightsRoutes);
app.use('/', ordersRoutes);

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`flights service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });


