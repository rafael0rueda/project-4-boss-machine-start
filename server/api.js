const express = require('express');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { createMeeting,
        getAllFromDatabase,
        getFromDatabaseById,
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase} = require('./db');

// Minions
apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    if(minions){
        res.status(200).send(minions);
    } else {
        res.status(404).send();
    }   
});

apiRouter.post('/minions', (req, res, next) => {
    const instance = req.body;
    const newIntace = addToDatabase('minions', instance);
    res.status(201).send(newIntace);
    if(newIntace){
        res.status(201).send(newIntace);
    } else {
        res.status(400).send();
    }
});

apiRouter.get('/minions/:miniondId', (req, res, next) => {
    const miniondId = req.params.miniondId;
    const minion = getFromDatabaseById('minions', miniondId);
    if(minion){
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    } 
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const instance = getFromDatabaseById('minions', minionId);
    const updateMinion = req.body;
    if(instance){
        const newInstace = updateInstanceInDatabase('minions', updateMinion);
        res.send(newInstace);
    } else {
        res.status(404).send();
    }
    
});

apiRouter.delete('/minions/:miniondId', (req, res, next) =>{
    const miniondId = req.params.miniondId;
    const deleteState = deleteFromDatabasebyId('minions', miniondId);
    if(deleteState){
        res.status(204).send(deleteState);
    } else {
        res.status(404).send('Minion not found o can not delete');
    }
});

// Ideas 
apiRouter.get('/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if(ideas){
        res.status(200).send(ideas);
    } else {
        res.status(404).send();
    }  
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const instance = req.body;
    const newIntace = addToDatabase('ideas', instance);
    if(newIntace){

        res.status(201).send(newIntace);
    } else {
        res.status(400).send();
    }
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', ideaId);
    if(idea){
        res.status(200).send(idea);
    } else {
        res.status(404).send();
    }       
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const instance = getFromDatabaseById('ideas', ideaId);
    const updateIdea = req.body;
    if(instance){
        const newInstace = updateInstanceInDatabase('ideas', updateIdea);
        res.send(newInstace);
    } else {
        res.status(404).send();
    }
});

apiRouter.delete('/ideas/:ideasId', (req, res, next) =>{
    const ideasId = req.params.ideasId;
    const deleteState = deleteFromDatabasebyId('ideas', ideasId);
    if(deleteState){
        res.status(204).send(deleteState);
    } else {
        res.status(404).send('Minion not found o can not delete');
    }
});


// Mettings
apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if(meetings){
        res.status(200).send(meetings);
    } else {
        res.status(404).send();
    } 
});

apiRouter.post('/meetings', (req, res,next) => {
    const newMeeting = createMeeting();
    const meeting = addToDatabase('meetings' ,newMeeting);
    if(meeting){
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send()
    } 
});

apiRouter.delete('/meetings', (req, res, next) =>{
    const meetings = deleteAllFromDatabase('meetings');
    if(meetings){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});


module.exports = apiRouter;
