const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const logger = require('../middlewares/logger')
const checkAuth = require('../middlewares/checkAuth')

router.use('/post', logger('post'), checkAuth, postRouter)
router.use('/auth', logger('auth'), authRouter)

module.exports = router

