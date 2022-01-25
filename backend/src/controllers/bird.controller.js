const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Bird } = require('../models')

const createBird = catchAsync(async (req, res) => {
  const newBird = await Bird.create(req.body)
  res.status(httpStatus.CREATED).send(newBird)
})

const removePark = catchAsync(async (id, parkId) => {
  await Bird.updateOne({ _id: id }, { $pull: { parks: parkId } })
})

module.exports = {
  createBird,
  removePark,
}
