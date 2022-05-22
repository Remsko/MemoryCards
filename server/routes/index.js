const createRouter = require('./createRouter');

const check = {};

const datas = {};

const format = {};

const addRoutes = app => {
    app.get('/', (req, res) => {
        res.send('Hello world');
    });
};

module.exports = {
    addRoutes
};