import { useState } from 'react';
import { Link } from 'react-router-dom';

import CardForm from '../CardForm';
import Modal from '../Modal';

import styles from './Deck.module.css';
// import addIconLight from '../../icons/add-card-icon-light.png';
// import addIconDark from '../../icons/add-card-icon-dark.png';
import addIcon from '../../icons/archive(1).png';

const Deck = ({
	className,
	deckname,
	deckId,
	onDelete,
	onShowCards,
}) => {
	const [showModal, setShowModal] = useState(false);
	// const [isHover, setIsHover] = useState(false);

	// const handleShowModal = () => setShowModal(true);
	// const handleCloseModal = () => setShowModal(false);

	return (
		<div className={styles.Deck + ' ' + className}>
			<Link
				className={styles.DeckLink}
				to={'/training/' + deckId}
			>
				<div className={styles.DeckName}>
					{deckname.charAt(0).toUpperCase() +
						deckname.slice(1)}
				</div>
			</Link>
			<div className={styles.IconContainer}>
				<img
					alt="Add Card"
					src={addIcon}
					className={styles.AddIcon}
					onClick={onShowCards}
				/>
			</div>
			<button onClick={() => onDelete(deckId)}>
				{/* delete */}
			</button>
			{/* <Modal
				show={showModal}
				onHide={handleCloseModal}
			>
				<CardForm deckId={deckId} />
			</Modal> */}
		</div>
	);
};

export default Deck;
