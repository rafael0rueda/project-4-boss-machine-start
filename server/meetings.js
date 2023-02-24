const express = require('express');
const meetingsRouter = express.Router();

const { createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if(meetings){
        res.status(200).send(meetings);
    } else {
        res.status(404).send();
    } 
});

meetingsRouter.post('/', (req, res,next) => {
    const newMeeting = createMeeting();
    const meeting = addToDatabase('meetings' ,newMeeting);
    if(meeting){
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send()
    } 
});

meetingsRouter.delete('/', (req, res, next) =>{
    const meetings = deleteAllFromDatabase('meetings');
    if(meetings){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;