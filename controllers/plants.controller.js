const Plant = require ('../models/Plant.model')
const { getAllSpeciesDetails } = require('../scripts/plants/seeds');
const { StatusCodes } = require('http-status-codes');

module.exports.createPlants = (req, res, next) => {
    
        const speciesDetails = getAllSpeciesDetails();
        const plants = speciesDetails.map(species => ({
            commonName: species.common_name,
            image: species.default_image.small_url
        }));

        Plant.create(plants)
            .then(createdPlants => {
                res.status(StatusCodes.CREATED).json(createdPlants);
            })
           .catch (next)
    }


module.exports.getAllPlants = (req, res, next) => {
        
        Plant.find()
         .then(plants => {
            res.status(StatusCodes.OK).json({ plants });
         })
         .catch(next) 
       
        }

    
     
      
      
      
      
      