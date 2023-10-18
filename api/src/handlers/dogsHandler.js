const {getAllDogs, searchDogName, getDogById, addDog} = require('../controllers/dogsController');

//Obtener todos los perros
const getDogsHandler = async(req, res)=>{
    const {name} = req.query;
    try {
        const result = name ? await searchDogName(name) : await getAllDogs();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).send({error: error.message});
    }
}

//Obtener detalle de un perro
const getDogByIdHandler = async (req, res) =>{
    const { id } = req.params;
    // const source = isNaN(id) ? 'bd' : 'api';
    try {
        const getbyIdDog = await getDogById(id);
        return res.status(200).json(getbyIdDog)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

//Crear un perro
const createDogHandler = async (req, res) => {
    try {
        const newDog = await addDog(req.body)
        res.status(200).json(newDog);
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler
} 