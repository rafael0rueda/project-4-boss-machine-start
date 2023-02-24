const express = require('express');
const minionsRouter = express.Router();

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    if(minions){
        res.status(200).send(minions);
    } else {
        res.status(404).send();
    }   
});

minionsRouter.post('/', (req, res, next) => {
    const instance = req.body;
    const newIntace = addToDatabase('minions', instance);
    res.status(201).send(newIntace);
    if(newIntace){
        res.status(201).send(newIntace);
    } else {
        res.status(400).send();
    }
});

minionsRouter.get('/:miniondId', (req, res, next) => {
    const miniondId = req.params.miniondId;
    const minion = getFromDatabaseById('minions', miniondId);
    if(minion){
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    } 
});

minionsRouter.put('/:minionId', (req, res, next) => {
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

minionsRouter.delete('/:miniondId', (req, res, next) =>{
    const miniondId = req.params.miniondId;
    const deleteState = deleteFromDatabasebyId('minions', miniondId);
    if(deleteState){
        res.status(204).send(deleteState);
    } else {
        res.status(404).send('Minion not found o can not delete');
    }
});

module.exports = minionsRouter;