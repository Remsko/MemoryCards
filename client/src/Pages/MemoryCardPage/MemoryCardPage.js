import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MemoryCardList from '../../Components/MemoryCardList';

import styles from './MemoryCard.module.css';

const MemoryCardPage = () => {
	const { deckId } = useParams();
	const [cards, setCards] = useState(null);

	useEffect(() => {
		const fetchCards = async () => {
			const result = await axios.get(
				`http://localhost:5000/cards/${deckId}`
			);
			setCards(result.data.cards);
		};
		fetchCards();
	}, [deckId]);

	const createCard = async ({ front, back }) => {
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
			return cards.filter(
				({ card_id }) => card_id !== cardId
			);
		});
	};

	const updateCard = async ({ front, back, cardId }) => {
		const { data } = await axios.patch(
			'http://localhost:5000/cards',
			{ front, back, cardId }
		);

		const id = data.card.card_id;
		setCards((cards) =>
			cards.map((card) =>
				card.card_id === id ? data.card : card
			)
		);
	};

	return (
		<div className={styles.MemoryCardPage}>
			<MemoryCardList
				cards={cards}
				onCreate={createCard}
				onDelete={deleteCard}
				onUpdate={updateCard}
			/>
		</div>
	);
};

export default MemoryCardPage;
