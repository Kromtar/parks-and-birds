const { startSession } = require('mongoose')
const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Bird, Park } = require('../models')
const { removeBird } = require('./other.controller')

const createBird = catchAsync(async (req, res) => {
  try {
    const newBird = await Bird.create(req.body)
    res.status(httpStatus.CREATED).send(newBird)
  } catch (err) {
    // En caso de atributo unique que se este repitiendo
    if (err && err.code == 11000) {
      res.status(httpStatus.BAD_REQUEST).send({
        code: 400,
        message:
          'Atributo/s único/s, ' +
          JSON.stringify(err.keyPattern) +
          ' repetido/s',
      })
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
  }
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
          // No incluimos las propiedades birds ni __v (MongoDb)
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
    if (updatedBird) res.send(updatedBird)
    res.status(httpStatus.NOT_FOUND).send()
  } catch (err) {
    // En caso de atributo unique que se este repitiendo
    if (err && err.code == 11000) {
      res.status(httpStatus.BAD_REQUEST).send({
        code: 400,
        message:
          'Atributo/s único/s, ' +
          JSON.stringify(err.keyPattern) +
          ' repetido/s',
      })
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
  }
})

const deleteBird = catchAsync(async (req, res) => {
  const session = await startSession()
  try {
    session.startTransaction()
    const bird = await Bird.findByIdAndDelete(req.params.bird_id, { session })
    if (bird) {
      for (const park_id of bird.parks) {
        await removeBird(park_id, req.params.bird_id, session)
      }
    }
    await session.commitTransaction()
    session.endSession()
    if (bird) {
      res.send(bird)
    } else {
      res.status(httpStatus.NOT_FOUND).send()
    }
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
  }
})

module.exports = {
  createBird,
  listBirds,
  getBird,
  updateBird,
  deleteBird,
}
