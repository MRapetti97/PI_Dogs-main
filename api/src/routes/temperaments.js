const { Router } = require('express');
const routerTemperaments = Router();

//Handlers
const temperamentsHandler = require('../handlers/temperamentsHandler')

//Rutas
//Obtener todos los temperamentos existentes.
routerTemperaments.get('/', temperamentsHandler) 

module.exports = routerTemperaments;