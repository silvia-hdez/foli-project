const Plant = require ('../models/Plant.model')
const { getAllSpeciesDetails } = require('../scripts/plants/seeds');
const { StatusCodes } = require('http-status-codes');



module.exports.getAllPlants = (req, res, next) => {
        
        Plant.find()
         .then(plants => {
            res.status(StatusCodes.OK).json({ plants });
         })
         .catch(next) 
       
        }

// module.exports.detailPlant = (req, res, next) => {
//    const {commonName} = req.params
//    const newName = commonName.replace(" ", '').toLowerCase()
//    console.log(newName)
//    Plant.findOne({commonName: newName})
//    .then(plant => {res.json(plant)})
//    .catch(next)
// }
     
      
      
      
      
      