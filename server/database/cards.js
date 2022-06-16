const db = require('./postgresql');

const selectCards = async () => {
	const result = await db.query(
		'SELECT * FROM cards ORDER BY card_id ASC'
	);

	return result.rows;
};

const selectCardsByDeckId = async () => {
	const result = await db.query(
		'SELECT * FROM cards WHERE deck_id = $1',
		[deckId]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const selectCardById = async ({ cardId }) => {
	const result = await db.query(
		'SELECT * FROM cards WHERE card_id = $1',
		[cardId]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const selectCardBySide = async ({ side }) => {
	const result = await db.query(
		'SELECT * FROM cards WHERE front = $1 OR back = $1',
		[side]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const insertCard = async ({ deckId, front, back }) => {
	const result = await db.query(
		`INSERT INTO cards(
            deck_id,
            front,
            back
        )
        VALUES($1, $2, $3)
        RETURNING *`,
		[deckId, front, back]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const updateCard = async ({ cardId, front, back }) => {
	const result = await db.query(
		`UPDATE cards
        SET front = ($1),
        	back = ($2)
        WHERE card_id = ($3)
        RETURNING *`,
		[front, back, cardId]
	);

	if (result.rowCount) {
		return result.rows[0];
	}
};

const deleteCard = async ({ id }) => {
	const _ = await db.query(
		`DELETE FROM cards WHERE card_id = ($1)`,
		[id]
	);
};

module.exports = {
	selectCards,
	selectCardsByDeckId,
	selectCardById,
	selectCardBySide,
	updateCard,
	insertCard,
	deleteCard,
};
