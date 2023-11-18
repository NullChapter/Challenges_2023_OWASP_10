const { Pool } = require('pg');
const bcrypt = require('bcrypt');
// Database connection parameters
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST | 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT | 5433, // PostgreSQL default port
});


async function createUser(username, password) {

    // Check if the user with the same username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        // A user with the same username already exists
        return -1;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
        text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
        values: [username, hashedPassword],
    };

    const result = await pool.query(query);

    return result.rows[0];
}


async function getUserByUsername(username) {
    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    };

    const result = await pool.query(query);

    return result.rows[0];
}

module.exports = { pool,createUser, getUserByUsername };