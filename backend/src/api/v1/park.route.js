const express = require('express')

const parkController = require('../../controllers/park.controller')

const router = express.Router()

router.route('/').post(parkController.createPark)

module.exports = router
