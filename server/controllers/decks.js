const decks = require('../database/decks');

const createDeck = async (req, res, next) => {
	const { deckname } = req.body;
	try {
		const sameDeck = await decks.selectDeckByName({
			deckname,
		});
		if (sameDeck) {
			const error = new Error(
				'Deck name already exists'
			);
			error.status = 409;
			return next(error);
		}

		const newDeck = await decks.insertDeck({
			deckname,
		});
		res.status(201);
		req.results = req.results || {};
		req.results.deck = newDeck;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error('Failed to create deck');
		error.status = 500;
		next(error);
	}
};

const readDecks = async (req, res, next) => {
	try {
		const result = await decks.selectDecks();
		res.status(200);
		req.results = req.results || {};
		req.results.decks = result;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error("Couldn't find decks");
		error.status = 500;
		next(error);
	}
};

const readDeck = async (req, res, next) => {
	const { id } = req.params;
	try {
		const result =
			(await decks.selectDeckByName({
				deckname: id,
			})) ||
			(await decks.selectDeckById({
				deckId: parseInt(id),
			}));
		if (!result) {
			const error = new Error('Deck not found');
			error.status = 404;
			return next(error);
		}
		res.status(200);
		req.results = req.results || {};
		req.results.deck = result;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error("Couldn't find deck");
		error.status = 500;
		next(error);
	}
};

const updateDeck = async (req, res, next) => {
	const { deckId } = req.body;
	try {
		const deck = await decks.selectDeckById({ deckId });
		if (!deck) {
			const error = new Error('Deck not found');
			error.status = 404;
			return next(error);
		}

		//check same deckname;

		const newValues = {
			deckId,
			deckname: req.body.deckname || deck.deckname,
		};

		const newDeck = await decks.updateDeck(newValues);
		res.status(200);
		req.results = req.results || {};
		req.results.deck = newDeck;
		next();
	} catch (dbError) {
		console.log(dbError);
		const error = new Error("Couldn't update deck");
		error.status = 500;
		next(error);
	}
};

const deleteDeck = async (req, res, next) => {
	const { deckId } = req.body;
	try {
		const deck = await decks.selectDeckById({ deckId });
		if (!deck) {
			const error = new Error('Deck not found');
			error.status = 404;
			return next(error);
		}
		const _ = await decks.deleteDeck({ deckId });
		res.status(204);
		req.results = req.results || {};
		next();
	} catch (dbError) {
		console.log(dbError);
		const error = new Error("Couldn't delete deck");
		error.status = 500;
		next(error);
	}
};

module.exports = {
	readDeck,
	createDeck,
	readDecks,
	updateDeck,
	deleteDeck,
};
