import { useEffect, useRef } from 'react';

import MemoryCard from '../MemoryCard';

import styles from './MemoryCardList.module.css';

const MemoryCardList = ({
	cards,
	onCreate,
	onDelete,
	onUpdate,
}) => {
	const scrollDownRef = useRef(null);

	useEffect(() => {
		scrollDownRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	}, [cards]);

	return (
		<div className={styles.CardList}>
			<div className={styles.CardTitle}>
				[{cards?.length}] card
				{cards?.length ? 's' : ''}
			</div>
			<div className={styles.CardListContainer}>
				{cards?.map(({ card_id, ...card }) => (
					<MemoryCard
						key={card_id}
						cardId={card_id}
						onDelete={onDelete}
						onUpdate={onUpdate}
						{...card}
					/>
				))}
				<MemoryCard
					front=""
					back=""
					onCreate={onCreate}
				/>
				<div ref={scrollDownRef} />
			</div>
		</div>
	);
};

export default MemoryCardList;
