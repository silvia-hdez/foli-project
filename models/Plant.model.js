const mongoose = require ('mongoose')
const { REQUIRED_FIELD } = require('../config/errorMessages')

const PlantSchema = new mongoose.Schema({
    commonName: {
        type: String,
        required: [true, REQUIRED_FIELD]
    },
    scientificName: {
        type: [String],
    },
    cycle: {
        type: String
    },
    watering: {
        type: String
    },
    sunlight:  {
        type: [String],
    },
    image:{
        type: String
    },

    
    "family": null,
    "origin": [],
    "type": "tree",
    "dimension": "Height:  60 feet",
    "cycle": "Perennial",
    "watering": "Frequent",
    "attracts": [],
    "propagation": [],
    "hardiness": {
        "min": "7",
        "max": "7"
    },
    "hardiness_location_image": "Coming Soon",
    "sunlight": [
        "full sun",
        "part shade"
    ],
    "soil": [],
    "growth_rate": "High",
    "maintenance": null,
    "drought_tolerant": false,
    "salt_tolerant": false,
    "thorny": false,
    "invasive": false,
    "tropical": false,
    "indoor": false,
    "care_level": "Medium",
    "pest_susceptibility": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "pest_susceptibility_api": "Coming Soon",
    "flowers": false,
    "flowering_season": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "flower_color": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "cones": true,
    "fruits": false,
    "edible_fruit": false,
    "edible_fruit_taste_profile": "Coming Soon",
    "fruit_nutritional_value": "Coming Soon",
    "fruit_color": [],
    "fruiting_season": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "harvest_season": "Coming Soon",
    "harvest_method": "Coming Soon",
    "leaf": true,
    "leaf_color": [
        "green"
    ],
    "edible_leaf": false,
    "edible_leaf_taste_profile": "Coming Soon",
    "leaf_nutritional_value": "Coming Soon",
    "cuisine": false,
    "cuisine_list": "Coming Soon",
    "medicinal": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "medicinal_use": "Coming Soon",
    "medicinal_method": "Coming",
    "poisonous_to_humans": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "poison_effects_to_humans": "Coming Soon",
    "poison_to_humans_cure": "Coming Soon",
    "poisonous_to_pets": "Upgrade Plan For Access https://perenual.com/subscription-api-pricing. Im sorry",
    "poison_effects_to_pets": "Coming Soon",
    "poison_to_pets_cure": "Coming Soon",
    "rare": "Coming Soon",
    "rare_level": "Coming Soon",
    "endangered": "Coming Soon",
    "endangered_level": "Coming Soon",
    "description": "Coming Soon",
    "problem": "Coming Soon",
    "default_image": {
        "license": 45,
        "license_name": "Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
        "license_url": "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
        "original_url": "https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg",
        "regular_url": "https://perenual.com/storage/species_image/1_abies_alba/regular/1536px-Abies_alba_SkalitC3A9.jpg",
        "medium_url": "https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg",
        "small_url": "https://perenual.com/storage/species_image/1_abies_alba/small/1536px-Abies_alba_SkalitC3A9.jpg",
        "thumbnail": "https://perenual.com/storage/species_image/1_abies_alba/thumbnail/1536px-Abies_alba_SkalitC3A9.jpg"
    }

})