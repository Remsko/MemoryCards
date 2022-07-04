import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import Card from '../../Components/MemoryCard';

import styles from './TrainingPage.module.css';
// import template from '../../styles/template.module.css';

const TrainingPage = () => {
	const { id } = useParams();
	const [cards, setCards] = useState([]);
	const [index, setIndex] = useState(0);
	const [show, setShow] = useState(false);
	const [answer, setAnswer] = useState('');
	const [inputBackground, setInputBackground] = useState(
		{}
	);

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
			const card = cards[index];

			return (
				<div className={styles.Card}>
					<div className={styles.Front}>
						{card.front}
					</div>
					<div className={styles.Divider}></div>
					<div
						onClick={() => setShow(true)}
						className={
							show
								? styles.Back
								: styles.BackHidden
						}
					>
						{card.back}
					</div>
				</div>
			);
		}
	};

	const next = () => {
		setAnswer('');
		setShow(false);
		setInputBackground({});
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
		if (answer === card.back) {
			setInputBackground({
				// 'background-color': '#CAC468',
				// 'border-color': '#474347',
				'background-color': '#474347',
				'border-color': '#CAC468',
			});
		} else {
			setInputBackground({
				// 'background-color': '#AB3E53',
				// 'border-color': '#542C35',
				'background-color': '#542C35',
				'border-color': '#AB3E53',
			});
		}
		setShow(true);
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
		<div className={styles.Training}>
			<div className={styles.Title}>
				Card {index + 1}/{cards.length}
			</div>
			{actualCard()}
			<div className={styles.Dashboard}>
				<input
					autoFocus
					type="text"
					name="answer"
					value={answer}
					onChange={handleAnswerChange}
					onKeyPress={validateAnswer}
					className={styles.DashboardInput}
					style={inputBackground}
				/>
				<div className={styles.Buttons}>
					<button onClick={testAnswer}>
						Valid
					</button>
					<button
						onClick={() => {
							console.log('triggered');
							setShow(true);
						}}
					>
						Show
					</button>
					<button onClick={next}>Next</button>
				</div>
			</div>
		</div>
	);
};

export default TrainingPage;
