const { Pool } = require('pg');
require('dotenv').config();

// Database connection parameters
const connection = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to the 'postgres' database to create a new one
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5433,
};

const pool = new Pool(connection);

(async () => {
  try {
    // Create the database if it doesn't exist
    await pool.query(`CREATE DATABASE "wierd-securitatis"`);

    console.log('Database "wierd-securitatis" created successfully');

    // Connect to the "wierd-securitatis" database
    const wierdDb = new Pool({
      ...connection,
      database: 'wierd-securitatis',
    });

    // Create the "users" table if it doesn't exist
    await wierdDb.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(60) NOT NULL
      )
    `);

    console.log('Table "users" created successfully');
  } catch (error) {
    console.error('Error:', error.message); // Log the error message for better diagnostics
  } finally {
    pool.end();
  }
})();
