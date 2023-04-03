const router = require('express').Router();
const authController = require('../controllers/auth.controller.');
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middelwares/auth.middelware');

const plantsController = require('../controllers/plants.controller')

const postController = require('../controllers/post.contoller.js')

//--- Authentication routes ---//

router.post('/login', authController.login);

//--- User routes ---//

router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);

//--- Plants routes ---//
router.post('/plants', plantsController.createPlants)
router.get('/plants', plantsController.getAllPlants)

//--- Post routes ---//
router.post('/users/me/new-post', authMiddleware.isAuthenticated, postController.create)
router.get('/users/me/posts', authMiddleware.isAuthenticated, postController.listPosts)
router.get('/users/me/my-posts', authMiddleware.isAuthenticated, postController.listMyPosts)
router.get("/users/me/posts/:id", authMiddleware.isAuthenticated, postController.detailPost)

module.exports = router;