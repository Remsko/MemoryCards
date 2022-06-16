const notFound = (req, res, next) => {
	const error = new Error('Not Found: Invalid Route');

	error.status = 404;
	next(error);
};

const capture = (error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: error.message || 'Internal server error',
	});
};

module.exports = {
	notFound,
	capture,
};
