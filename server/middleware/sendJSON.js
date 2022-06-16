const sendJSON = (req, res, next) => {
	if (!req.results) {
		return next();
	}
	return res.json(req.results);
};

module.exports = sendJSON;
