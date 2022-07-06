import { useState, useEffect, useRef } from 'react';

import styles from './MemoryCard.module.css';

const MemoryCard = ({
	cardId,
	front,
	back,
	onDelete,
	onUpdate,
	onCreate,
}) => {
	const autoFocusRef = useRef(null);
	const [card, setCard] = useState({ front, back });

	useEffect(() => {
		if (typeof onCreate === 'function') {
			autoFocusRef.current.focus();
		}
	}, [onCreate]);

	const handleFocus = ({ currentTarget }) => {
		currentTarget.setSelectionRange(
			currentTarget.value.length,
			currentTarget.value.length
		);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			if (typeof onUpdate === 'function') {
				onUpdate({ ...card, cardId });
			} else if (typeof onCreate === 'function') {
				onCreate(card);
				setCard({ front: '', back: '' });
			}
		}
	};

	const handleBlur = () => {
		if (typeof onUpdate === 'function') {
			setCard({ front, back });
		}
	};

	return (
		<div className={styles.Card}>
			<input
				ref={autoFocusRef}
				type="text"
				placeholder={'Front 앞'}
				value={card.front}
				size={
					card.front.length || 'Front 앞'.length
				}
				onChange={({ target }) => {
					setCard({
						...card,
						front: target.value,
					});
				}}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				className={styles.CardSide}
			/>
			<div className={styles.Divider} />
			<input
				type="text"
				placeholder={'Back 뒤'}
				value={card.back}
				size={card.back.length || 'Back 뒤'.length}
				onChange={({ target }) => {
					setCard({
						...card,
						back: target.value,
					});
				}}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				className={styles.CardSide}
			/>
			{onDelete && (
				<div
					className={styles.Cross}
					onClick={() => onDelete(cardId)}
				/>
			)}
		</div>
	);
};

export default MemoryCard;
