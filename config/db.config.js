const mongoose = require('mongoose');
const axios = require('axios')
const seeds = require('../scripts/plants/seeds')
const DB_NAME = 'InstaPlant';
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_URI = `${URI}/${DB_NAME}`;
const Plant = require ('../models/Plant.model')

//--- Conexion a la BBDD ---//

mongoose.connect(DB_URI)
  .then((conn) => {
    console.info(`Successfully connected to the database ${DB_URI}`)

    // si la coleccion esta vacia -> insertar
  conn.models['Plant'].countDocuments({})

   .then((count) => {
    if(count === 0) {
      seeds.getRandomPlants()
      .then((plants) => {
        plants.forEach(plant => {
          Plant.create( {
            "commonName": plant.common_name,
            "image": plant.default_image.medium_url
          }
        )
        console.log(`Inserted ${plants.length} plants`)

      });
      
      })
      .catch((err) => console.error(err));
    }
   })
   
   
  })
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${DB_URI}`, error);
    process.exit(0);
  })



//--- Cierre de la conexión ---//

process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    })
});
