const express = require('express');

const createRouter = functions => {
    const router = express.Router({ mergeParams: true });

    functions.forEach(f => {
        router.use(f);
    });
    return router;
}

module.exports = createRouter;