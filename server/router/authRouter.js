const express = require('express')
const { registration, login, logout, refreshAuth } = require('../controllers/authController')
const router = express.Router()
const { validateLogin, validatePassword } = require('../validation/authValidation')

router.post('/registration', validateLogin(), validatePassword(), registration)
router.post('/login', validateLogin(), validatePassword(), login)
router.get('/refresh', refreshAuth)
router.delete('/logout', logout)

module.exports = router