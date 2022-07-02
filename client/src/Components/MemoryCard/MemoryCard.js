import { useState } from 'react';
import axios from 'axios';

import styles from './MemoryCard.module.css';

const MemoryCard = ({
	cardId,
	onDelete,
	show = true,
	...props
}) => {
	const [front, setFront] = useState(props.front);
	const [back, setBack] = useState(props.back);
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateFront, setUpdateFront] = useState(front);
	const [updateBack, setUpdateBack] = useState(back);

	const updateCard = async () => {
		const { data } = await axios.patch(
			'http://localhost:5000/cards',
			{ front: updateFront, back: updateBack, cardId }
		);
		setFront(data.card.front);
		setBack(data.card.back);
		setUpdateFront(data.card.front);
		setUpdateBack(data.card.back);
	};

	const loseUpdateFocus = () => {
		setUpdateFront(front);
		setUpdateBack(back);
		setIsUpdating(false);
	};

	const handleKey = (e) => {
		if (e.key === 'Escape') {
			loseUpdateFocus();
		}
		if (e.key === 'Enter' || e.keyCode === 13) {
			updateCard();
			setIsUpdating(false);
		}
	};

	const getFieldSize = (isFront) => {
		// const size = isFront ? front.length : back.length;

		// if (size) {
		// 	return isFront ? size * 1.25 : size;
		// }

		return (isFront ? 'Front' : 'Back').length;
	};

	const renderSide = (isFront) => {
		if (!isUpdating) {
			return (
				<span
					onClick={() => {
						setIsUpdating(true);
					}}
					className={styles.CardSide}
					size={
						isFront ? front.length : back.length
					}
				>
					{isFront ? front : back}
				</span>
			);
		}

		return (
			<input
				type="text"
				value={isFront ? updateFront : updateBack}
				onChange={(e) => {
					isFront
						? setUpdateFront(e.target.value)
						: setUpdateBack(e.target.value);
				}}
				placeholder={isFront ? 'Front' : 'Back'}
				className={styles.CardSide}
				size={getFieldSize(isFront)}
				onBlur={loseUpdateFocus}
				onKeyDown={handleKey}
				onFocus={(e) =>
					e.currentTarget.setSelectionRange(
						e.currentTarget.value.length,
						e.currentTarget.value.length
					)
				}
			/>
		);
	};

	return (
		<div className={styles.Card}>
			<div
				className={styles.Cross}
				onClick={() => onDelete(cardId)}
			/>
			{renderSide(true)}
			<div className={styles.Divider} />
			{show && renderSide(false)}
		</div>
	);
};

export default MemoryCard;
