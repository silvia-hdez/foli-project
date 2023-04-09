const mongoose = require ('mongoose')

const saveSchema = new mongoose.model({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'PostPlant'
    },
    plants: {
        type: mongoose.Types.ObjectId,
        ref: 'Plant'
    }
},
{
    timestamps: true,
    toObject: {
      virtual: true
    }
})

const Save = mongoose.model('Save', saveSchema)
module.exports = Save