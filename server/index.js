const http = require('http');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { PORT, DROPDB } = require('./config');
const routes = require('./routes/routes');
const createSchema = require('./database/createSchema');

createSchema(DROPDB);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
routes.addRoutes(app);

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
