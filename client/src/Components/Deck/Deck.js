import { NavLink } from 'react-router-dom';

import styles from './Deck.module.css';

export const DeckInput = (props) => {
	return (
		<div className={styles.Deck}>
			<input
				autoFocus
				type="text"
				placeholder="Deckname 덱 이름"
				className={styles.DeckName}
				{...props}
			/>
		</div>
	);
};

const Deck = ({ deckname, deckId, onDelete }) => {
	return (
		<NavLink
			to={`/decks/${deckId}`}
			className={({ isActive }) =>
				isActive ? styles.DeckActive : styles.Deck
			}
		>
			<div className={styles.DeckName}>
				{deckname.charAt(0).toUpperCase() +
					deckname.slice(1)}
			</div>
			<button
				onClick={() => onDelete(deckId)}
			></button>
		</NavLink>
	);
};

export default Deck;
