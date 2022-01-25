const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Park } = require('../models')

const createPark = catchAsync(async (req, res) => {
  const newPark = await Park.create(req.body)
  res.status(httpStatus.CREATED).send(newPark)
})

module.exports = {
  createPark,
}
