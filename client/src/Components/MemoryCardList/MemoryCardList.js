import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import MemoryCard from '../MemoryCard';
import styles from './MemoryCardList.module.css';
import stylesCard from '../MemoryCard/MemoryCard.module.css';

import cardIcon from '../../icons/quill(4).png';

const MemoryCardList = ({ deckId }) => {
	const [cards, setCards] = useState(null);
	const [isCreating, setIsCreating] = useState(false);

	const scrollDownRef = useRef(null);

	const [front, setFront] = useState('');
	const [back, setBack] = useState('');

	useEffect(() => {
		const fetchCards = async () => {
			const result = await axios.get(
				`http://localhost:5000/cards/${deckId}`
			);
			setCards(result.data.cards);
		};
		fetchCards();
	}, [deckId]);

	useEffect(() => {
		scrollDownRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	}, [isCreating]);

	const loseCreationFocus = () => {
		setIsCreating(false);
		setFront('');
		setBack('');
	};

	const handleKey = (e) => {
		if (e.key === 'Escape') {
			loseCreationFocus();
		}
		if (e.key === 'Enter' || e.keyCode === 13) {
			createCard();
			loseCreationFocus();
		}
	};

	const createCard = async () => {
		console.log(front, back, deckId);
		const { data } = await axios.post(
			'http://localhost:5000/cards',
			{ front, back, deckId }
		);

		setCards((cards) => {
			return [...cards, data.card];
		});
	};

	const deleteCard = async (cardId) => {
		await axios.delete('http://localhost:5000/cards', {
			data: { cardId },
		});

		setCards((cards) => {
			return cards.filter(({ card_id }) => {
				return card_id !== cardId;
			});
		});
	};

	return (
		<>
			<div className={styles.CardsContainer}>
				{cards?.map(({ card_id, ...card }) => (
					<MemoryCard
						onDelete={deleteCard}
						key={card_id}
						cardId={card_id}
						{...card}
					/>
				))}
				{isCreating && (
					<div
						className={
							stylesCard.Card +
							' ' +
							stylesCard.Dummy
						}
					>
						<input
							autoFocus
							type="text"
							value={front}
							onChange={(e) =>
								setFront(e.target.value)
							}
							placeholder="Front"
							className={stylesCard.CardSide}
							size={
								front.length ||
								'Front'.length
							}
							onBlur={() => {
								if (!front.length) {
									loseCreationFocus();
								}
							}}
							onKeyDown={handleKey}
						/>
						<div
							className={stylesCard.Divider}
						/>
						<input
							type="text"
							value={back}
							onChange={(e) =>
								setBack(e.target.value)
							}
							placeholder="Back"
							className={stylesCard.CardSide}
							size={
								back.length || 'Back'.length
							}
							onBlur={loseCreationFocus}
							onKeyDown={handleKey}
						/>
					</div>
				)}
				<div className={styles.CardsBackground} />
				<div ref={scrollDownRef} />
			</div>
			<div className={styles.IconContainer}>
				<img
					src={cardIcon}
					className={styles.AddIcon}
					onClick={() => {
						setIsCreating(true);
					}}
				/>
			</div>
		</>
	);
};

export default MemoryCardList;
