const { Pool } = require('pg');
require('dotenv').config();

// Database connection parameters
const connection = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to the 'postgres' database to create a new one
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(connection);

(async () => {
  try {
    // Connect to the default "postgres" database
    const defaultDb = new Pool({
      ...connection,
      database: 'postgres',
    });

    // Define a function that checks if a database exists and creates it if it doesn't
    const createDatabaseIfNotExists = async (dbName) => {
      const { rows } = await defaultDb.query(`
        SELECT 1 FROM pg_database WHERE datname = $1
      `, [dbName]);

      if (rows.length === 0) {
        await defaultDb.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database "${dbName}" created successfully`);
      }
    };

    // Call the function with the name of the database you want to create
    await createDatabaseIfNotExists('wierd-securitatis');

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
