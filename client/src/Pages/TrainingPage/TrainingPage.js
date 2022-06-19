import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Card from '../../Components/Card';

import styles from './TrainingPage.module.css';
import template from '../../styles/template.module.css';

const TrainingPage = () => {
	const { id } = useParams();
	const [cards, setCards] = useState([]);
	const [index, setIndex] = useState(0);
	const [show, setShow] = useState(false);
	const [answer, setAnswer] = useState('');

	console.log('RENDER');

	useEffect(() => {
		const fetchCards = async () => {
			const result = await axios.get(
				`http://localhost:5000/cards/${id}`
			);
			setCards(result.data.cards);
		};
		fetchCards();
	}, [id]);

	const actualCard = () => {
		if (cards.length) {
			return <Card show={show} {...cards[index]} />;
		}
	};

	const flip = () => {
		setShow(true);
	};

	const next = () => {
		setShow(false);
		if (index + 1 < cards.length) {
			setIndex(index + 1);
		} else {
			alert('Training is done !');
		}
	};

	const handleAnswerChange = (e) => {
		e.persist();
		setAnswer(e.target.value);
	};

	const testAnswer = () => {
		const card = cards[index];
		if (answer === card.front) {
			alert('RIGHT');
		} else {
			alert('WRONG');
			flip();
		}
	};

	const validateAnswer = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			if (!show) {
				testAnswer();
			} else {
				next();
			}
		}
	};

	return (
		<div className={template.center}>
			<div className={styles.Training}>
				{actualCard()}
				<input
					type="text"
					name="answer"
					value={answer}
					onChange={handleAnswerChange}
					onKeyPress={validateAnswer}
				/>
				<button onClick={testAnswer}>Valid</button>
				<button onClick={flip}>Show</button>
				<button onClick={next}>Next</button>
			</div>
		</div>
	);
};

export default TrainingPage;
