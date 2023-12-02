const { Pool } = require('pg');
const pgtools = require('pgtools');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '62442',
    port: 5432,
};

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '62442',
    port: 5432,
    database: 'db-enade-keys',
});

module.exports = { pool, config };
