import { useState } from 'react';
import axios from 'axios';

import styles from './CardForm.module.css';

const CardForm = ({ deckId }) => {
	const [front, setFront] = useState('');
	const [back, setBack] = useState('');

	const createCard = async () => {
		console.log(front, back, deckId);
		const { data } = await axios.post(
			'http://localhost:5000/cards',
			{ front, back, deckId }
		);

		console.log(data);
		alert('It worked');
	};

	const handleFrontChange = (e) => {
		e.persist();
		setFront(e.target.value);
	};

	const handleBackChange = (e) => {
		e.persist();
		setBack(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createCard();
		setFront('');
		setBack('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.CardForm}
		>
			<label>
				Front:
				<input
					type="text"
					name="front"
					value={front}
					onChange={handleFrontChange}
				/>
			</label>
			<label>
				Back:
				<input
					type="text"
					name="back"
					value={back}
					onChange={handleBackChange}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default CardForm;
