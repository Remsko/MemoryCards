const { query } = require('./postgresql');

const schema = (DROPDB) => {
    return `
	${DROPDB ? 'DROP TABLE IF EXISTS decks;' : ''}
	CREATE TABLE IF NOT EXISTS decks(
		id						SERIAL PRIMARY KEY,
		deckname                VARCHAR(30)
	);`;
};

const createSchema = (DROPDB) => {
    query(schema(DROPDB))
        .then(() => {
            console.log(`Database schema ${DROPDB ? 'reinitialized' : 'created'} successfully !`);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = createSchema;