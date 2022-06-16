const createRouter = require('./createRouter');

const checkers = {};

const controllers = {
	decks: require('../controllers/decks'),
	cards: require('../controllers/cards'),
};

const format = {
	sendJSON: require('../middleware/sendJSON'),
};

const errors = require('../errors');

const createRoutes = () => {
	const routes = {
		createDeck: createRouter([
			controllers.decks.createDeck,
			format.sendJSON,
		]),
		readDecks: createRouter([
			controllers.decks.readDecks,
			format.sendJSON,
		]),
		updateDeck: createRouter([
			controllers.decks.updateDeck,
			format.sendJSON,
		]),
		deleteDeck: createRouter([
			controllers.decks.deleteDeck,
			format.sendJSON,
		]),
		createCard: createRouter([
			controllers.cards.createCard,
			format.sendJSON,
		]),
		readCards: createRouter([
			controllers.cards.readCards,
			format.sendJSON,
		]),
		updateCard: createRouter([
			controllers.cards.updateCard,
			format.sendJSON,
		]),
		deleteCard: createRouter([
			controllers.cards.deleteCard,
			format.sendJSON,
		]),
	};

	return routes;
};

const addRoutes = (app) => {
	const routes = createRoutes();

	app.get('/', (req, res) => {
		res.send('Hello world').status(200);
	});

	app.post('/decks', routes.createDeck);
	app.get('/decks', routes.readDecks);
	app.patch('/decks', routes.updateDeck);
	app.delete('/decks', routes.deleteDeck);

	app.post('/cards', routes.createCard);
	app.get('/cards', routes.readCards);
	app.patch('/cards', routes.updateCard);
	app.delete('/cards', routes.deleteCard);

	app.use(errors.notFound);
	app.use(errors.capture);
};

module.exports = {
	addRoutes,
};
