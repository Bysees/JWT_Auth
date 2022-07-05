const express = require('express')
const { create, getAll, update, remove } = require('../controllers/postController')
const { validateText } = require('../validation/postValidation')
const router = express.Router()

router.post('/', validateText(), create)
router.get('/', getAll)
router.put('/:id', validateText(), update)
router.delete('/:id', remove)

module.exports = router