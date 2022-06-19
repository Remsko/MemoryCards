import { useState } from 'react';
import { Link } from 'react-router-dom';

import CardForm from '../CardForm';
import Modal from '../Modal';

import styles from './Deck.module.css';

const Deck = ({ deckname, deckId, onDelete }) => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<div className={styles.Deck}>
			<Link
				className={styles.DeckName}
				to={'/training/' + deckId}
			>
				{deckname.charAt(0).toUpperCase() +
					deckname.slice(1)}
			</Link>
			<button onClick={handleShowModal}>+</button>
			<button onClick={() => onDelete(deckId)}>
				delete
			</button>
			<Modal
				show={showModal}
				onHide={handleCloseModal}
			>
				<CardForm deckId={deckId} />
			</Modal>
		</div>
	);
};

export default Deck;
