const Plant = require("../models/Plant.model");
const { StatusCodes } = require("http-status-codes");
const Save = require("../models/Save.model");

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
      console.log(plant);
      res.json(plant);
    })
    .catch(next);
};

//---Plants Bookmarks---//

module.exports.save = (req, res, next) => {
  const { plantId } = req.params;
  const newSave = new Save({ user: req.currentUserId, plant: plantId });

  newSave
    .save()
    .then(() => res.status(201).send("Planta guardada correctamente"))
    .catch((err) => res.status(500).send(err.message));
};

module.exports.listSavePlants = (req, res, next) => {
  Save.find({ user: req.currentUserId })
    .populate("plants")
    .then((saves) => res.status(200).send(saves))
    .catch((err) => res.status(500).send(err.message));
};
