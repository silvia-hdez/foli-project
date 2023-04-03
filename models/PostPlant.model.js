const mongoose = require ('mongoose')
const REQUIRED_FIELD = require ('../config/errorMessages')


const postSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, REQUIRED_FIELD],
        default: null,
    },
    image: {
        type: String,
        required: [true, REQUIRED_FIELD],
    },
    userPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

})

const PostPlant = mongoose.model('PostPlant', postSchema)
module.exports = PostPlant