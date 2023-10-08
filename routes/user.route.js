const express = require('express')
const userController = require('../controllers/user.controller')
const router = express.Router()



router.get('/', userController.findAll)

router.get('/:username', userController.findOne)

router.post('/', userController.create)
router.patch('/', userController.update)
router.delete('/:username', userController.delete)

module.exports = router 