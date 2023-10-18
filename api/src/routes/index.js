const { Router } = require('express');
const routers = Router();

const routerDogs = require('./dogs')
const routerTemperaments = require('./temperaments')

routers.use('/dogs', routerDogs);
routers.use('/temperaments', routerTemperaments);

module.exports = routers;
