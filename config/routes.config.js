const router = require('express').Router();
const authController = require('../controllers/auth.controller.');
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middelwares/auth.middelware');

//--- Authentication routes ---//

router.post('/login', authController.login);

//--- User routes ---//

router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);

module.exports = router;