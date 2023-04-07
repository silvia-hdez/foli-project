const { StatusCodes } = require('http-status-codes')
const PostPlant = require('../models/PostPlant.model')


//---Crear post--//

module.exports.create = (req, res, next) => {

    if(req.files) {
       req.body.image=req.files.map(file=>file.path)
    }
    const {name, image, description, comments, state} = req.body
    PostPlant.create({name, image, userPost: req.currentUserId, description,
        comments, state})
        .then(newPost => {
            res.status(StatusCodes.CREATED).json(newPost)
        })
        .catch(next)
    
}

//---Obtener listado posts---//

module.exports.listPosts = (req, res, next) => {
    const userId = req.currentUserId;
    PostPlant.find({userPost: {$ne: userId}})
        .then(posts => {
            res.json(posts)
        })
        .catch(next)
}   

module.exports.listMyPosts = (req, res, next) => {
    const userId = req.currentUserId;
    PostPlant.find({ userPost: userId })
        .then(posts => {
            res.json(posts)
        })
        .catch(next)
}

//---Detalle del post---//
module.exports.detailPost = (req, res, next) => {
    const {id} = req.params
    PostPlant.findById(id)
        .then(post => {
            res.json(post)
        })
        .catch(next)
}

//---Eliminar post---//
module.exports.delete = (req, res, next) => {
    const {id} = req.params
    PostPlant.findByIdAndDelete(id)
        .then(()=>{
            
        })
        .catch(next)
}

//---Editar post---//
module.exports.edit = (req, res, next) => {
    const updates = {name: req.body.name}
    console.log(updates)
    PostPlant.findByIdAndUpdate(req.params.id, updates)
        .then(()=>{
            res.send('Post actualizado');
        })
        .catch(next)
}