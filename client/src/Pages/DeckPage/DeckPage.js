import { useState, useEffect } from 'react';
import axios from 'axios';
import Deck from '../../Components/Deck';

import styles from './DeckPage.module.css';
import template from '../../styles/template.module.css';

const DeckPage = () => {
	const [decks, setDecks] = useState([]);
	const [newDeck, setNewDeck] = useState('');

	useEffect(() => {
		const fetchDecks = async () => {
			const result = await axios.get(
				'http://localhost:5000/decks'
			);
			setDecks(result.data.decks);
		};
		fetchDecks();
	}, []);

	const createDeck = async () => {
		const { data } = await axios.post(
			'http://localhost:5000/decks',
			{ deckname: newDeck }
		);

		setDecks((decks) => {
			return [...decks, data.deck];
		});
		setNewDeck('');
	};

	const deleteDeck = async (deckId) => {
		await axios.delete('http://localhost:5000/decks', {
			data: { deckId },
		});

		setDecks((decks) => {
			return decks.filter(({ deck_id }) => {
				return deck_id !== deckId;
			});
		});
	};

	return (
		<div className={template.center}>
			<div className={styles.DecksContainer}>
				{decks.map(({ deckname, deck_id }) => (
					<Deck
						key={deck_id}
						deckname={deckname}
						deckId={deck_id}
						onDelete={deleteDeck}
					/>
				))}
				<input
					type="text"
					onChange={(e) =>
						setNewDeck(e.target.value)
					}
					value={newDeck}
				></input>
				<button onClick={() => createDeck()}>
					+
				</button>
			</div>
		</div>
	);
};

export default DeckPage;
