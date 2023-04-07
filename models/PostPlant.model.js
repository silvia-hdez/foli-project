const mongoose = require ('mongoose')
const REQUIRED_FIELD = require ('../config/errorMessages')


const postSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, REQUIRED_FIELD],
        default: null,
    },
    image: {
        type: {},
        required: [true, REQUIRED_FIELD],
    },
    userPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }, 
    description: {
        type: String,
    },
    comments: {
        type: String,
    },
    state: {
        type: String,
        enum: ["Insta", "Ayuda", "Solucionado", "Esqueje"],
        required:true
    }

})

const PostPlant = mongoose.model('PostPlant', postSchema)
module.exports = PostPlant