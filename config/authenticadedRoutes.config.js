const router = require('express').Router();
const authController = require('../controllers/auth.controller.');
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middelwares/auth.middelware');

const plantsController = require('../controllers/plants.controller')

const postController = require('../controllers/post.contoller.js')
const upload = require('../config/storage.config')

router.get('/users/me', usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);

//--- Plants routes ---//
router.get('/plants', plantsController.getAllPlants)
router.get('/plants/:id', plantsController.detailPlant)

router.post('/plants/:id/save', plantsController.save)


//--- Post routes ---//
router.post('/new-post', upload.array('image'), postController.create)
router.get('/posts', postController.listPosts)
router.get('/my-posts', postController.listMyPosts)
router.get("/posts/:id", postController.detailPost)
router.post('/posts/:id/edit', upload.array('image'), postController.edit)
router.post('/posts/:id/delete', postController.delete)

module.exports = router;