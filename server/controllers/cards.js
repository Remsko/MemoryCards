const cards = require('../database/cards');

const createCard = async (req, res, next) => {
	const { front, back, deckId } = req.body;
	console.log(front, back);

	try {
		const sameFront = await cards.selectCardBySide({
			side: front,
		});
		if (sameFront) {
			const error = new Error(
				'A card already exists with this frontside'
			);
			error.status = 409;
			return next(error);
		}
		const sameBack = await cards.selectCardBySide({
			side: back,
		});
		if (sameBack) {
			const error = new Error(
				'A card already exists with this backside'
			);
			error.status = 409;
			return next(error);
		}

		const newCard = await cards.insertCard({
			front,
			back,
			deckId,
		});
		res.status(201);
		req.results = req.results || {};
		req.results.card = newCard;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error('Failed to create card');
		error.status = 500;
		next(error);
	}
};

const readCards = async (req, res, next) => {
	try {
		const result = await cards.selectCards();
		res.status(200);
		req.results = req.results || {};
		req.results.cards = result;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error("Couldn't find cards");
		error.status = 500;
		next(error);
	}
};

const readCardsByDeckId = async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await cards.selectCardsByDeckId({
			deckId: id,
		});
		res.status(200);
		req.results = req.results || {};
		req.results.cards = result;
		next();
	} catch (dbError) {
		console.error(dbError);
		const error = new Error("Couldn't find cards");
		error.status = 500;
		next(error);
	}
};

const updateCard = async (req, res, next) => {
	const { cardId } = req.body;
	try {
		const card = await cards.selectCardById({ cardId });
		if (!card) {
			const error = new Error('Card not found');
			error.status = 404;
			return next(error);
		}

		// check sides;

		const newValues = {
			cardId,
			front: req.body.front || card.front,
			back: req.body.back || card.back,
		};

		const newCard = await cards.updateCard(newValues);
		res.status(200);
		req.results = req.results || {};
		req.results.card = newCard;
		next();
	} catch (dbError) {
		console.log(dbError);
		const error = new Error("Couldn't update card");
		error.status = 500;
		next(error);
	}
};

const deleteCard = async (req, res, next) => {
	const { cardId } = req.body;
	try {
		const card = await cards.selectCardById({ cardId });
		if (!card) {
			const error = new Error('Deck not found');
			error.status = 404;
			return next(error);
		}
		const _ = await cards.deleteCard({
			cardId,
		});
		res.status(204);
		req.results = req.results || {};
		next();
	} catch (dbError) {
		console.log(dbError);
		const error = new Error("Couldn't delete card");
		error.status = 500;
		next(error);
	}
};

module.exports = {
	createCard,
	readCardsByDeckId,
	readCards,
	updateCard,
	deleteCard,
};
