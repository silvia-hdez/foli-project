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
      console.log(savedPlant)
      //res.status(201).send("Planta guardada correctamente")
      res.status(201).json(savedPlant);
    }
   )
    .catch((err) => res.status(500).send(err.message));
};

module.exports.listSavePlants = (req, res, next) => {

  Save.find({ user: req.currentUserId })
    .populate("plant")
    .then(saves => {
      const savesPlants = saves.map(save => save);
      
      res.status(200).json(savesPlants);
    })
    .catch(next);
    
};


module.exports.delete = (req, res, next) => {
  const { saveId } = req.params;
  Save.findByIdAndDelete(saveId)
  .then(() =>  res.status(201).send("Bookmark eliminado correctamente"))
  .catch((err) => console.log(err))
}


// module.exports.listMyPlantsSaves = (req, res, next) => {
//   Plant.find()
//   .populate('save')
//     .then((plants) => {
//       res.status(StatusCodes.OK).json(plants);
//     })
//     .catch(next);
//}

// module.exports.listMyPlantsSaves = (req, res, next) => {
//   const {user} = req.params
//   Plant.find({user})
//   .populate('plant')
//     .then((saves) => {
//       const filtered = saves.filter((fav) => {
//         return fav.plant === false
//      })
//      res.status(201).json(filtered);
//     })
//     .catch(next);
// }