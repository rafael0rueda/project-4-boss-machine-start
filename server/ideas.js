const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if(ideas){
        res.status(200).send(ideas);
    } else {
        res.status(404).send();
    }  
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const instance = req.body;
    const newIntace = addToDatabase('ideas', instance);
    if(newIntace){

        res.status(201).send(newIntace);
    } else {
        res.status(400).send();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', ideaId);
    if(idea){
        res.status(200).send(idea);
    } else {
        res.status(404).send();
    }       
});

ideasRouter.put('/:ideaId', (req, res, next) => {
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

ideasRouter.delete('/:ideasId', (req, res, next) =>{
    const ideasId = req.params.ideasId;
    const deleteState = deleteFromDatabasebyId('ideas', ideasId);
    if(deleteState){
        res.status(204).send(deleteState);
    } else {
        res.status(404).send('Minion not found o can not delete');
    }
});

module.exports = ideasRouter;