const DeckList = () => {
	return (
		<div className={styles.BottomButton}>
			<div className={styles.DecksContainer}>
				<div className={styles.DeckList}>
					{decks?.map(({ deckname, deck_id }) => (
						<div
							onClick={() => {
								setDeckId(deck_id);
								setShowCards(true);
							}}
						>
							<Deck
								className={
									showCards &&
									deck_id === deckId
										? styles.Active
										: ''
								}
								key={deck_id}
								deckname={deckname}
								deckId={deck_id}
								onDelete={deleteDeck}
							/>
						</div>
					))}
					{isCreating && (
						<div className={styles.DeckDummy}>
							<input
								autoFocus
								className={
									styles.DeckDummyName
								}
								type="text"
								onKeyDown={handleKey}
								onChange={handleChange}
								onBlur={handleBlur}
								value={newDeck}
							/>
						</div>
					)}
					<div ref={scrollDownRef} />
				</div>
			</div>

			<button
				className={styles.DeckCreation}
				onClick={() => setIsCreating(true)}
			>
				+
			</button>
		</div>
	);
};

export default DeckList;
