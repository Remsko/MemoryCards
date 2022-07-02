import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import MemoryCardList from '../../Components/MemoryCardList';
import Deck from '../../Components/Deck';

import styles from './DeckPage.module.css';

const DeckPage = () => {
	const [decks, setDecks] = useState(null);
	const [newDeck, setNewDeck] = useState('');

	const [isCreating, setIsCreating] = useState(false);

	const scrollDownRef = useRef(null);

	const [deckId, setDeckId] = useState(null);
	const [showCards, setShowCards] = useState(false);

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
		setNewDeck('');
		setIsCreating(false);
	};

	return (
		<div className={styles.DeckPage}>
			<div className={styles.MainContainer}>
				<div className={styles.BottomButton}>
					<div className={styles.DecksContainer}>
						<div className={styles.DeckList}>
							{decks?.map(
								({ deckname, deck_id }) => (
									<Deck
										onShowCards={() => {
											setDeckId(
												deck_id
											);
											setShowCards(
												true
											);
										}}
										key={deck_id}
										deckname={deckname}
										deckId={deck_id}
										onDelete={
											deleteDeck
										}
									/>
								)
							)}
							{isCreating && (
								<div
									className={
										styles.DeckDummy
									}
								>
									<input
										autoFocus
										className={
											styles.DeckDummyName
										}
										type="text"
										onKeyDown={
											handleKey
										}
										placeholder="Deckname 덱 이름"
										onChange={
											handleChange
										}
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
			</div>
			{showCards && (
				<MemoryCardList deckId={deckId} />
			)}
		</div>
	);
};

export default DeckPage;
