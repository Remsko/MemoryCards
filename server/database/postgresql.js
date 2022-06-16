const { Pool } = require('pg');

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = require('../config');

const pool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	port: PGPORT,
});

const query = async (text, params, callback) => {
	const start = Date.now();
	const result = await pool.query(text, params, callback);
	const duration = Date.now() - start;

	console.log('[EXECUTED QUERY]: ', {
		text,
		params,
		duration,
		rows: result.rowCount,
	});

	return result;
};

module.exports = {
	query,
};
