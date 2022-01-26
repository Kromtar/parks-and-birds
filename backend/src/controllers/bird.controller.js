const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Bird, Park } = require('../models')
const { removeBird } = require('./other.controller')

const createBird = catchAsync(async (req, res) => {
  const newBird = await Bird.create(req.body)
  res.status(httpStatus.CREATED).send(newBird)
})

const listBirds = catchAsync(async (req, res) => {
  const birds = await Bird.find()
  res.send({ results: birds })
})

const getBird = catchAsync(async (req, res) => {
  const include_parks = req.query.include_parks || false
  const bird = await Bird.findById(req.params.bird_id)
  if (bird) {
    //En caso de incluir los Parques en forma embebida, incluimos la entidad completa en la propiedad parks
    if (include_parks) {
      var aux_parks = []
      await Promise.all(
        bird.parks.map(async (park_id) => {
          aux_parks.push(await Park.findById(park_id, '-birds -__v'))
        })
      )
      bird.parks = aux_parks
    }
    res.send(bird)
  }
  res.status(httpStatus.NOT_FOUND).send()
})

const updateBird = catchAsync(async (req, res) => {
  try {
    const updatedBird = await Bird.findByIdAndUpdate(
      req.params.bird_id,
      req.body,
      { new: true }
    )
    res.send(updatedBird)
  } catch (err) {
    res.status(httpStatus.NOT_FOUND).send(err)
  }
})

const deleteBird = catchAsync(async (req, res) => {
  const bird = await Bird.findByIdAndDelete(req.params.bird_id)
  if (bird) {
    bird.parks.forEach(async (park_id) => {
      await removeBird(park_id, req.params.bird_id)
    })
    res.send(bird)
  }
  res.status(httpStatus.NOT_FOUND).send()
})

module.exports = {
  createBird,
  listBirds,
  getBird,
  updateBird,
  deleteBird,
}
