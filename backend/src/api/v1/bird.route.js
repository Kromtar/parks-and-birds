const express = require('express')

const birdController = require('../../controllers/bird.controller')

const router = express.Router()

router.route('/').post(birdController.createBird)

module.exports = router
