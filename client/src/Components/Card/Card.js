const Card = ({ front, back, show }) => {
	return (
		<div>
			<div>{front}</div>
			{show && <div>{back}</div>}
		</div>
	);
};

export default Card;
