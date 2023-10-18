const axios = require('axios');
require("dotenv").config()
const { URL_API, API_KEY } = process.env;

const {Dog, Temperament} = require('../db');

//Obtener todas las razas de los perros desde la API
const getDogsApi = async()=>{
    //Listado de perros de la API
    const {data} = await axios(`${URL_API}/?api_key=${API_KEY}`);
    const dogsApi = data.map(dog =>{
        let [minWeight, maxWeight] = dog.weight.metric.split("-")
        let [minHeight, maxHeight] = dog.height.metric.split("-")

        return {
            id: dog.id,
            name: dog.name,
            minHeight: Number(minHeight),
            maxHeight: Number(maxHeight),
            minWeight: Number(minWeight),
            maxWeight: Number(maxWeight),
            life_span: dog.life_span,
            temperaments: dog.temperament,
            image: dog.image.url
        }
    });

    return dogsApi;
}
//Obtener todas las razas de los perros desde la  BD
const getDogsBd = async ()=>{
    //Listado de perros de la BD
    const dogsBD = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    const dogsBdFormat = dogsBD.map(dog =>{
        return {
            id: dog.id,
            name: dog.name,
            minHeight: dog.minHeight,
            maxHeight: dog.maxHeight,
            minWeight: dog.minWeight,
            maxWeight: dog.maxWeight,
            life_span: dog.life_span,
            temperaments: (dog.Temperaments.map(temp => temp.name)).join(', '),
            image: dog.image
        }
    })
    return dogsBdFormat;
}

//Unimos todos los perros de la Api y BD
const getAllDogs = async()=>{
    const dogsApi = await getDogsApi(); 
    const dogsBd = await getDogsBd();
    return [...dogsBd, ...dogsApi ]
}

//Buscar por nombre
const searchDogName = async (name)=>{
    const allDogs = await getAllDogs();
    const searchDog = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    if(searchDog.length === 0) throw new Error('There is not dog');
    return searchDog;
}

//Obtener detalle de un perro por ID
const getDogById = async (id)=>{
    
    const allDogs = await getAllDogs();
    const dog = allDogs.find((d) => d.id.toString() === id.toString())
    
    //Si en caso no existe el ID
    if(!dog) throw new Error(`No existe el perro con id: ${id}`);
    return dog; 
}


//Crear un perro
const addDog = async (data)=>{
    const {name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperaments} = data;
    const found = await Dog.findOne({ where: { name } });
    if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !life_span || !image || !temperaments) throw new Error('Faltan datos');
    if(temperaments.length === 0) throw new Error('Agrega por lo menos 1 temperamento');
    if (found) throw new Error("This breed already exists");

    const newDog ={
        name, 
        minHeight,
        maxHeight, 
        minWeight,
        maxWeight,
        life_span, 
        image
    };
    
    const addNewDog = await Dog.create(newDog);
    temperaments.forEach(async (temp) => {
        let temperamentsDB = await Temperament.findAll({
            where: { name : temp}
        })
        await addNewDog.addTemperament(temperamentsDB);
    });

    return addNewDog;
}

module.exports = {
    getAllDogs,
    searchDogName,
    getDogById,
    addDog
}