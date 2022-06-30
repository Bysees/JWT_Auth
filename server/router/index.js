const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const postRouter = require('./post')
const logger = require('../middlewares/logger')
const checkAuth = require('../middlewares/checkAuth')

router.use('/post', logger('post'), checkAuth, postRouter)
router.use('/auth', logger('auth'), authRouter)

module.exports = router

