require("dotenv").config();
const axios = require("axios");
const apiUrl = "https://perenual.com/api";
const apiKey = process.env.API_KEY;

const PLANTS_LIMIT = 3;

const http = axios.create({
  baseURL: apiUrl,
});

// const getAllSpeciesDetails = () => {
//   const URL = `${apiUrl}?key=${apiKey}`;
//   const http = axios.get(URL);
//   return response.data;
// }

const getTotalNumberPlants = () => {
  return http
    .get("/species-list", {
      params: {
        key: apiKey,
      },
    })
    .then((response) => response.data.total)
    .catch((err) => console.error(err));
};

const getRandomPlantId = (total) => {
  return Math.floor(Math.random() * (total - 1));
};

const getRandomPlants = () => {
  getTotalNumberPlants().then((total) => {
    const ids = [];

    while (ids.length < PLANTS_LIMIT) {
      const randomId = getRandomPlantId(total);

      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }

    // Ya tengo el array de ids
    // Itero y por cada uno de ellos hago una peticion al endpoint de detalle con axios
    // De la response.data tengo la planta
    // Con esa info me monto el objeto guay
    // Plant.create(objetoGuay)
  });
};

getRandomPlants();
