import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Deck from '../../Components/Deck';

import styles from './DeckPage.module.css';
import decksIcon from '../../icons/package.png';

const DeckPage = () => {
	const [decks, setDecks] = useState([]);
	const [newDeck, setNewDeck] = useState('');

	const [isCreating, setIsCreating] = useState(false);

	const scrollDownRef = useRef(null);

	useEffect(() => {
		const fetchDecks = async () => {
			const result = await axios.get(
				'http://localhost:5000/decks'
			);
			setDecks(result.data.decks);
		};
		fetchDecks();
	}, []);

	useEffect(() => {
		scrollDownRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	}, [isCreating]);

	const createDeck = async () => {
		const { data } = await axios.post(
			'http://localhost:5000/decks',
			{ deckname: newDeck }
		);

		setDecks((decks) => {
			return [...decks, data.deck];
		});
		setNewDeck('');
		setIsCreating(false);
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

	const handleKey = (e) => {
		if (e.key === 'Escape') {
			setNewDeck('');
			setIsCreating(false);
		}
		if (e.key === 'Enter' || e.keyCode === 13) {
			createDeck();
		}
	};

	const handleChange = (e) => {
		setNewDeck(e.target.value);
	};

	const handleBlur = () => {
		if (newDeck.length) {
			createDeck();
		} else {
			setIsCreating(false);
		}
	};

	return (
		<div className={styles.DeckPage}>
			{/* <div className={styles.DeckTitle}>Decks</div> */}
			<img
				alt="Decks"
				src={decksIcon}
				className={styles.DecksIcon}
				// onClick={handleShowModal}
			/>
			<div className={styles.DecksContainer}>
				<div className={styles.DeckList}>
					{decks.map(({ deckname, deck_id }) => (
						<Deck
							key={deck_id}
							deckname={deckname}
							deckId={deck_id}
							onDelete={deleteDeck}
						/>
					))}
					{isCreating && (
						<div className={styles.DeckDummy}>
							<input
								autoFocus
								className={
									styles.DeckDummyName
								}
								type="text"
								onKeyDown={handleKey}
								onChange={handleChange}
								onBlur={handleBlur}
								value={newDeck}
							/>
						</div>
					)}
					<div ref={scrollDownRef} />
				</div>
			</div>
			<button
				className={styles.DeckCreation}
				onClick={() => setIsCreating(true)}
			>
				+
			</button>
		</div>
	);
};

export default DeckPage;
