const express = require('express')
const { registration, login, isAuth } = require('../controllers/auth')
const router = express.Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/', isAuth)

module.exports = router