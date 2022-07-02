const express = require('express')
const { registration, login, isAuth } = require('../controllers/auth')
const checkAuth = require('../middlewares/checkAuth')
const router = express.Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/', checkAuth, isAuth)

module.exports = router