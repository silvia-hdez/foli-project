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

module.exports = router;