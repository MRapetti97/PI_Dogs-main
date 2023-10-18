const axios = require("axios");
const { Temperament } = require("../db.js");
const { URL_API, API_KEY } = process.env;

//Agregar los temperaments de la API  a la BD
const addTemperaments = async () => {
  const { data } = await axios(`${URL_API}/?api_key=${API_KEY}`);
  const allTemperaments = data.map((dog) => dog.temperament);

  allTemperaments.forEach((temperament) => {
    if (temperament) {
      let temperamtsArr = temperament.split(",");
      temperamtsArr.forEach((temp) => {
        Temperament.findOrCreate({
          where: {
            name: temp.trim(),
          },
        });
      });
    }
  });
};
addTemperaments();

//Listar todos los Temperaments
const getTemperaments = async () => {
  return await Temperament.findAll();
};

module.exports = getTemperaments;
