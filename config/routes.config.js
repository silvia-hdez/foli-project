const router = require('express').Router()
const usersController = require('../controllers/users.controller')

router.post('/users', usersController.create);
router.get('/users', usersController.list);

module.exports = router