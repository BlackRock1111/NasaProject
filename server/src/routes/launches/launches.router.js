const express = require('express');
const {httpgetAllLaunches,httpAddNewLaunch,httpDeleteLaunch} = require('./launches.controller');

const launchesRouter = express.Router();
launchesRouter.get('/',httpgetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);
launchesRouter.delete('/:id',httpDeleteLaunch)

module.exports = {
    launchesRouter
}