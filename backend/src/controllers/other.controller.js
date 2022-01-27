const { startSession } = require('mongoose')
const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Park, Bird } = require('../models')

const linkBirdParkById = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findById(req.body.park_id)
  const bird = await Bird.findById(req.body.bird_id)
  if (park && bird) {
    const session = await startSession()
    try {
      session.startTransaction()
      //Agregamos de forma cruzadas la referencias a las Ids
      await Park.updateOne(
        { _id: req.body.park_id },
        { $addToSet: { birds: req.body.bird_id } },
        { session }
      )
      await Bird.updateOne(
        { _id: req.body.bird_id },
        { $addToSet: { parks: req.body.park_id } },
        { session }
      )
      await session.commitTransaction()
      session.endSession()
      res.status(httpStatus.OK).send()
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: 500 })
    }
  }
  res.status(httpStatus.NOT_FOUND).send({ code: 404 })
})

const linkBirdParkByName = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findOne({ name: req.body.park_name })
  const bird = await Bird.findOne({ name: req.body.bird_name })
  if (park && bird) {
    const session = await startSession()
    try {
      session.startTransaction()
      //Agregamos de forma cruzadas la referencias a las Ids
      await Park.updateOne(
        { _id: park._id },
        { $addToSet: { birds: bird._id } },
        { session }
      )
      await Bird.updateOne(
        { _id: bird._id },
        { $addToSet: { parks: park._id } },
        { session }
      )
      await session.commitTransaction()
      session.endSession()
      res.status(httpStatus.OK).send()
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: 500 })
    }
  }
  res.status(httpStatus.NOT_FOUND).send({ code: 404 })
})

const unLinkBirdParkById = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findById(req.body.park_id)
  const bird = await Bird.findById(req.body.bird_id)
  if (park && bird) {
    const session = await startSession()
    try {
      session.startTransaction()
      //Removemos las referencias cruzadas
      await removePark(req.body.bird_id, req.body.park_id, session)
      await removeBird(req.body.park_id, req.body.bird_id, session)
      await session.commitTransaction()
      session.endSession()
      res.status(httpStatus.OK).send()
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: 500 })
    }
  }
  res.status(httpStatus.NOT_FOUND).send({ code: 404 })
})

const unLinkBirdParkByName = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findOne({ name: req.body.park_name })
  const bird = await Bird.findOne({ name: req.body.bird_name })
  if (park && bird) {
    const session = await startSession()
    try {
      session.startTransaction()
      //Removemos las referencias cruzadas
      await removePark(bird._id, park._id, session)
      await removeBird(park._id, bird._id, session)
      await session.commitTransaction()
      session.endSession()
      res.status(httpStatus.OK).send()
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: 500 })
    }
  }
  res.status(httpStatus.NOT_FOUND).send({ code: 404 })
})

// Remueve un Parque desde una Ave
const removePark = async (id, parkId, session) => {
  await Bird.updateOne({ _id: id }, { $pull: { parks: parkId } }, { session })
}

// Remueve una Ave desde un Parque
const removeBird = async (id, birdId, session) => {
  await Park.updateOne({ _id: id }, { $pull: { birds: birdId } }, { session })
}

module.exports = {
  linkBirdParkById,
  unLinkBirdParkById,
  linkBirdParkByName,
  unLinkBirdParkByName,
  removePark,
  removeBird,
}
