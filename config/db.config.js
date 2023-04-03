const mongoose = require('mongoose');
const axios = require('axios')

const DB_NAME = 'InstaPlant';
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_URI = `${URI}/${DB_NAME}`;


//--- Conexión a la API ---//

const createApiHttp = () => {
  const http = axios.create({
    baseUrl: "https://perenual.com/api"
  })
}

//--- Conexion a la BBDD ---//

mongoose.connect(DB_URI)
  .then(() => {
   console.info(`Successfully connected to the database ${DB_URI}`)
    // if collection Plant not in MONGO 
    // llamar a getAllPlantas
    //TODO Verificar si existe colección de plantas. Si no, la BBDD se acaba de crear: crear colección

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
