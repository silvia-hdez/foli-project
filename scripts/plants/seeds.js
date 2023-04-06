require("dotenv").config();
require("../../config/db.config");
const mongoose = require("mongoose");
const axios = require("axios");
const apiUrl = "https://perenual.com/api";
const apiKey = process.env.API_KEY;
const Plant = require("../../models/Plant.model");

const PLANTS_LIMIT = 200;

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
      console.log("RandomId: ", ids);
    }

    const plantDetail = ids.map((id) => {
      return http
        .get(`/species/details/${id}`, {
          params: {
            key: apiKey,
          },
        })
        .then((response) => response.data)
        .catch((err) => console.error(err));
    });

    return Promise.all(plantDetail);
  });
};

getRandomPlants()
  .then((plants) => {
    plants.map((plant) => {
      console.log(plant.id);
      Plant.create({
        commonName: plant.common_name,
        image: plant.default_image.medium_url,
        scientificName: plant.scientific_name,
        cycle: plant.cycle,
        watering: plant.watering,
        sunlight: plant.sunlight,
        family: plant.family,
        origin: plant.origin,
        attracts: plant.attracts,
        propagation: plant.propagation,
        soil:plant.soil,
        growthRate: plant.growth_rate,
        droughtTolerant: plant.drought_tolerant,
        maintenance: plant.maintenance,
        thorny: plant.thorny,
        invasive: plant.invasive,
        tropical: plant.tropical,
        indoor: plant.indoor,
        flowers: plant.flowers,
        fruits: plant.fruits,
        cuisine: plant.cuisine
      })
        .then((res) => {
          console.log(res);
         // mongoose.disconnect();
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.error(err));
