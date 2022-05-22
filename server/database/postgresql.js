const { Pool } = require('pg');

const {
    PGUSER,
    PGHOST,
    PGDATABASE,
    PGPASSWORD,
    PGPORT
} = require('../config');

const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT
});

const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};

module.exports = {
    query
};