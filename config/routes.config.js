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
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser);

//--- Plants routes ---//
router.get('/plants', authMiddleware.isAuthenticated, plantsController.getAllPlants)

//--- Post routes ---//
router.post('/new-post', authMiddleware.isAuthenticated, postController.create)
router.get('/posts', authMiddleware.isAuthenticated, postController.listPosts)
router.get('/my-posts', authMiddleware.isAuthenticated, postController.listMyPosts)
router.get("/posts/:id", authMiddleware.isAuthenticated, postController.detailPost)

module.exports = router;