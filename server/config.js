require('dotenv').config();

const PORT = process.env.PORT || 4000;

const PGUSER = process.env.PGUSER || 'postgres';
const PGHOST = process.env.PGHOST || 'localhost';
const PGDATABASE = process.env.PGDATABASE || 'memorycards';
const PGPASSWORD = process.env.PGPASSWORD || 'memorycardspasswrd';
const PGPORT = process.env.PGPORT || 5432;

const DROPDB = process.env.DROPDB;

module.exports = {
    PORT,
    PGUSER,
    PGHOST,
    PGDATABASE,
    PGPASSWORD,
    PGPORT,
    DROPDB,
}