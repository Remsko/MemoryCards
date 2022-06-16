const db = require('./postgresql');

const selectDecks = async () => {
	const result = await db.query(
		'SELECT * FROM decks ORDER BY deck_id ASC'
	);

	return result.rows;
};

const selectDeckById = async ({ deckId }) => {
	const result = await db.query(
		'SELECT * FROM decks WHERE deck_id = $1',
		[deckId]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const selectDeckByName = async ({ deckname }) => {
	const result = await db.query(
		'SELECT * FROM decks WHERE deckname = $1',
		[deckname]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const insertDeck = async ({ deckname }) => {
	const result = await db.query(
		`INSERT INTO decks(
            deckname
        )
        VALUES($1)
        RETURNING *`,
		[deckname]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const updateDeck = async ({ deckId, deckname }) => {
	const result = await db.query(
		`UPDATE decks
        SET deckname = ($1)
        WHERE deck_id = ($2)
        RETURNING *`,
		[deckname, deckId]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const deleteDeck = async ({ deckId }) => {
	const _ = await db.query(
		`DELETE FROM decks WHERE deck_id = ($1)`,
		[deckId]
	);
};

module.exports = {
	selectDecks,
	selectDeckById,
	selectDeckByName,
	updateDeck,
	insertDeck,
	deleteDeck,
};
