const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Park, Bird } = require('../models')
const { removePark } = require('./other.controller')

const createPark = catchAsync(async (req, res) => {
  const newPark = await Park.create(req.body)
  res.status(httpStatus.CREATED).send(newPark)
})

const listParks = catchAsync(async (req, res) => {
  const parks = await Park.find()
  res.send({ results: parks })
})

const getPark = catchAsync(async (req, res) => {
  const include_birds = req.query.include_birds || false
  const park = await Park.findById(req.params.park_id)
  if (park) {
    //En caso de incluir las Aves en forma embebida, incluimos la entidad completa en la propiedad birds
    if (include_birds) {
      var aux_birds = []
      await Promise.all(
        park.birds.map(async (bird_id) => {
          aux_birds.push(await Bird.findById(bird_id, '-parks -__v'))
        })
      )
      park.birds = aux_birds
    }
    res.send(park)
  }
  res.status(httpStatus.NOT_FOUND).send()
})

const updatePark = catchAsync(async (req, res) => {
  try {
    const updatedPark = await Park.findByIdAndUpdate(
      req.params.park_id,
      req.body,
      { new: true }
    )
    res.send(updatedPark)
  } catch (err) {
    res.status(httpStatus.NOT_FOUND).send(err)
  }
})

const deletePark = catchAsync(async (req, res) => {
  const park = await Park.findByIdAndDelete(req.params.park_id)
  if (park) {
    park.birds.forEach(async (bird_id) => {
      await removePark(bird_id, req.params.park_id)
    })
    res.send(park)
  }
  res.status(httpStatus.NOT_FOUND).send()
})

module.exports = {
  createPark,
  listParks,
  getPark,
  updatePark,
  deletePark,
}
