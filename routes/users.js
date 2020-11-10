const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.post('/validate', UserController.validate)

module.exports = router