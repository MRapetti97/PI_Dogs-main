const { Router } = require('express');
const routerDogs = Router();

//Handlers
const {
    getDogsHandler, 
    getDogByIdHandler,
    createDogHandler
} = require('../handlers/dogsHandler')

routerDogs.get('/', getDogsHandler); //Obtener todas las razas de los perros
routerDogs.get('/:id', getDogByIdHandler); //Obtener detalle de una raza
routerDogs.post('/', createDogHandler); //Crear raza de perros

module.exports = routerDogs;