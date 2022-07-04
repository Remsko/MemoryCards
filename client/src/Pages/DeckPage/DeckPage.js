import { useState, useEffect } from 'react';
import axios from 'axios';

import DeckList from '../../Components/DeckList';
import styles from './DeckPage.module.css';
import { useNavigate, Outlet } from 'react-router-dom';

const DeckPage = () => {
	const navigate = useNavigate();
	const [decks, setDecks] = useState(null);

	useEffect(() => {
		const fetchDecks = async () => {
			const result = await axios.get(
				'http://localhost:5000/decks'
			);
			setDecks(result.data.decks);
		};
		fetchDecks();
	}, []);

	const createDeck = async (deckname) => {
		const { data } = await axios.post(
			'http://localhost:5000/decks',
			{ deckname }
		);

		setDecks((decks) => {
			return [...decks, data.deck];
		});
		navigate(`${data.deck.deck_id}`);
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
		navigate('/decks');
	};

	return (
		<div className={styles.DeckPage}>
			<DeckList
				decks={decks}
				onCreate={createDeck}
				onDelete={deleteDeck}
			/>
			<Outlet />
		</div>
	);
};

export default DeckPage;
