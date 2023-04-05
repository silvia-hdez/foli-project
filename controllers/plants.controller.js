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

    
     
      
      
      
      
      