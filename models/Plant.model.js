const mongoose = require ('mongoose')
const { REQUIRED_FIELD } = require('../config/errorMessages')

const plantSchema = new mongoose.Schema({
    commonName: {
        type: String,
        required: [true, REQUIRED_FIELD]
    },
    scientificName: {
        type: [String],
    },
    cycle:String,
    watering: String,
    image:{
        type: String,
    },
    family: String,
    origin: [String],
    attracts: [String],
    propagation: [String],
    sunlight: [String],
    soil: [String],
    growthRate: String,
    droughtTolerant: Boolean,
    maintenance: String, 
    thorny: Boolean,
    invasive: Boolean,
    tropical: Boolean,
    indoor: Boolean,
    flowers: Boolean,  
    fruits: Boolean,
    cuisine: Boolean,
},
{
    timestamps: true,
    toObject: {
        virtual: true
      }
}
)

plantSchema.virtual('saves',{
    ref: 'Save',
    foreignField: 'post',
    localField: '_id',
    justOne: false
})



const Plant = mongoose.model('Plant', plantSchema)
module.exports = Plant