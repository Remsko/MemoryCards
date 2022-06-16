const { query } = require('./postgresql');

const schema = (DROPDB) => {
	const resetMaybe = DROPDB ? 'DROP TABLE IF EXISTS decks CASCADE;' : '';
	return `
	${resetMaybe}
	CREATE TABLE IF NOT EXISTS decks(
		deck_id     INT GENERATED ALWAYS AS IDENTITY,
		deckname    VARCHAR(30),
        PRIMARY KEY(deck_id)
	);
    CREATE TABLE IF NOT EXISTS cards(
        card_id     INT GENERATED ALWAYS AS IDENTITY,
        deck_id     INT,
        front       VARCHAR(255),
        back        VARCHAR(255),
        PRIMARY KEY(card_id),
        CONSTRAINT fk_deck
            FOREIGN KEY(deck_id)
                REFERENCES decks(deck_id)
    );
    `;
};

const createSchema = (DROPDB) => {
	query(schema(DROPDB))
		.then(() => {
			const msg = `Database schema ${
				DROPDB ? 'reset' : 'created'
			} successfully !`;
			console.log(msg);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = createSchema;
