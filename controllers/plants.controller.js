const Plant = require("../models/Plant.model");
const { StatusCodes } = require("http-status-codes");

module.exports.getAllPlants = (req, res, next) => {
  Plant.find()
    .then((plants) => {
      res.status(StatusCodes.OK).json(plants);
    })
    .catch(next);
};

module.exports.detailPlant = (req, res, next) => {
  const { id } = req.params;
  
  Plant.findById(id)
    .then((plant) => {
        console.log(plant)
      res.json(plant);
    })
    .catch(next);
};


