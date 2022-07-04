import { useRef, useEffect, useState } from 'react';

import Deck, { DeckInput } from '../Deck';

import styles from './DeckList.module.css';

const DeckList = ({ decks, onCreate, onDelete }) => {
	const [deckname, setDeckname] = useState('');
	const scrollDownRef = useRef(null);

	useEffect(() => {
		scrollDownRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	}, [decks]);

	const stopCreation = () => {
		setDeckname('');
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			stopCreation();
		}
		if (e.key === 'Enter' || e.keyCode === 13) {
			onCreate(deckname);
			stopCreation();
		}
	};

	const handleChange = (e) => {
		setDeckname(e.target.value);
	};

	return (
		<div className={styles.DeckList}>
			<div className={styles.DeckTitle}>
				{'Decks {...}'}
			</div>
			<div className={styles.DeckListContainer}>
				{decks?.map(({ deckname, deck_id }) => (
					<Deck
						key={deck_id}
						deckname={deckname}
						deckId={deck_id}
						onDelete={onDelete}
					/>
				))}
				<DeckInput
					value={deckname}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={stopCreation}
				/>
				<div ref={scrollDownRef} />
			</div>
		</div>
	);
};

export default DeckList;
