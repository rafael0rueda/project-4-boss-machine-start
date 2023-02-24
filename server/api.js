const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

// Minions
apiRouter.use('/minions', minionsRouter);
// Ideas 
apiRouter.use('/ideas', ideasRouter);
// Meetings
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;