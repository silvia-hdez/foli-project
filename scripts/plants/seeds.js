require("dotenv").config();
const axios = require("axios");
const apiUrl = "https://perenual.com/api";
const apiKey = process.env.API_KEY;

const PLANTS_LIMIT = 2;

const http = axios.create({
  baseURL: apiUrl,
});


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
 return getTotalNumberPlants().then((total) => {
    const ids = [];

    while (ids.length < PLANTS_LIMIT) {
      const randomId = getRandomPlantId(total);

      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
      //console.log('RandomId: ', ids)
    }

    const plantDetail = ids.map((id) => {
      return http.get(`/details/${id}`, {
        params: {
          key: apiKey,
        },
      })
      .then((response) => response.data)
      .catch((err) => console.error(err));
    })


    
    return Promise.all(plantDetail);

  

  });
};

getRandomPlants()
.then((plants) => {
  console.log(plants);
})
.catch((err) => console.error(err));




    // Ya tengo el array de ids
    // Itero y por cada uno de ellos hago una peticion al endpoint de detalle con axios
    // De la response.data tengo la planta
    // Con esa info me monto el objeto guay
    // Plant.create(objetoGuay)



g