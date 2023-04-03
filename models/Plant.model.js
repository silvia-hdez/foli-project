const mongoose = require ('mongoose')
const { REQUIRED_FIELD } = require('../config/errorMessages')

const PlantSchema = new mongoose.Schema({
    commonName: {
        type: String,
        required: [true, REQUIRED_FIELD]
    },
    // scientificName: {
    //     type: [String],
    // },
    // cycle: {
    //     type: String
    // },
    // watering: {
    //     type: String
    // },
    // sunlight:  {
    //     type: [String],
    // },
    image:{
        type: String,
    },
    // family: String,
    // origin: [String],
    // type: String,
    // // dimension: "Height:  60 feet",
    // cycle:String,
    // watering: String,
    // attracts: [String],
    // propagation: [String],
    // // hardiness: {
    // //     "min": "7",
    // //     "max": "7"
    // // },
    
    // sunlight: [String],
    // soil: [String],
    // growthRate: String,
    // droughtTolerant: Boolean,
    // maintenance: String, 
    // thorny: Boolean,
    // invasive: Boolean,
    // tropical: Boolean,
    // indoor: Boolean,
    // careLevel:String,
    // // pest_susceptibility: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // // pest_susceptibility_api: "Coming Soon",
    // flowers: Boolean,
    // // flowering_season: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // // flower_color: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
   
    // fruits: Boolean,
    // edibleFruit: Boolean,
    // fruitColor: [String],
    // // fruiting_season: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // leaf: Boolean,
    // leafColor: [String],
    // edibleLeaf: Boolean,
    // cuisine: Boolean,
    // medicinal: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // medicinal_use: "Coming Soon",
    // medicinal_method: "Coming",
    // poisonous_to_humans: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // poison_effects_to_humans: "Coming Soon",
    // poison_to_humans_cure: "Coming Soon",
    // poisonous_to_pets: "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    // poison_effects_to_pets: "Coming Soon",
    // poison_to_pets_cure: "Coming Soon",
    // rare: "Coming Soon",
    // rare_level: "Coming Soon",
    // endangered: "Coming Soon",
    // endangered_leve": "Coming Soon",
    // description: "Coming Soon",
    // problem: "Coming Soon",


})

const Plant = mongoose.model('Plant', PlantSchema)
module.exports = Plant