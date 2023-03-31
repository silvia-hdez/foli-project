const router = require('express').Router()
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller.')
const authMiddelware = require('../middelwares/auth.middelware')

//--- Authentication routes ---//

router.post('/login', authController.login)

//--- User routes ---//

router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/:id', usersController.getUser)

router.get('/users/me', authMiddelware.isAuthenticated, usersController.getCurrentUser)


//--- Authentication routes ---//

router.post('/login', authController.login)

module.exports = router