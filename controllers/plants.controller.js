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
  console.log(plantId)
  const newSave = new Save({ user: req.currentUserId, plant: plantId });

  newSave
    .save()
    .then((savedPlant) => {
      console.log(newSave)
      //res.status(201).send("Planta guardada correctamente")
      res.status(201).json(newSave);
    }
   )
    .catch((err) => res.status(500).send(err.message));
};

module.exports.listSavePlants = (req, res, next) => {
  //console.log(req.currentUserId)
  Save.find({ user: req.currentUserId })
    .populate("plant")
    .then((saves) => res.status(200).json(saves))
    .catch((err) => res.status(500).send(err.message));
};

module.exports.delete = (req, res, next) => {
  Save.findByIdAndDelete(req.params.saveId)
  .then(() =>  res.status(201).send("Bookmark eliminado correctamente"))
  .catch((err) => console.log(err))
}
