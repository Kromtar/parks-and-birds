const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { Park, Bird } = require('../models')

const linkBirdParkById = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findById(req.body.park_id)
  const bird = await Bird.findById(req.body.bird_id)
  if (park && bird) {
    //Agregamos de forma cruzadas la referencias a las Ids
    await Park.updateOne(
      { _id: req.body.park_id },
      { $addToSet: { birds: req.body.bird_id } }
    )
    await Bird.updateOne(
      { _id: req.body.bird_id },
      { $addToSet: { parks: req.body.park_id } }
    )
    res.status(httpStatus.OK).send()
  }
  res.status(httpStatus.NOT_FOUND).send()
})

const linkBirdParkByName = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findOne({ name: req.body.park_name })
  const bird = await Bird.findOne({ name: req.body.bird_name })
  if (park && bird) {
    //Agregamos de forma cruzadas la referencias a las Ids
    await Park.updateOne({ _id: park._id }, { $addToSet: { birds: bird._id } })
    await Bird.updateOne({ _id: bird._id }, { $addToSet: { parks: park._id } })
    res.status(httpStatus.OK).send()
  }
  res.status(httpStatus.NOT_FOUND).send()
})

const unLinkBirdParkById = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findById(req.body.park_id)
  const bird = await Bird.findById(req.body.bird_id)
  if (park && bird) {
    //Removemos las referencias cruzadas
    await removePark(req.body.bird_id, req.body.park_id)
    await removeBird(req.body.park_id, req.body.bird_id)
    res.status(httpStatus.OK).send()
  }
  res.status(httpStatus.NOT_FOUND).send()
})

const unLinkBirdParkByName = catchAsync(async (req, res) => {
  //Verifica que las entidades existan
  const park = await Park.findOne({ name: req.body.park_name })
  const bird = await Bird.findOne({ name: req.body.bird_name })
  if (park && bird) {
    //Removemos las referencias cruzadas
    await removePark(bird._id, park._id)
    await removeBird(park._id, bird._id)
    res.status(httpStatus.OK).send()
  }
  res.status(httpStatus.NOT_FOUND).send()
})

// Remueve un Parque desde una Ave
const removePark = catchAsync(async (id, parkId) => {
  await Bird.updateOne({ _id: id }, { $pull: { parks: parkId } })
})

// Remueve una Ave desde un Parque
const removeBird = catchAsync(async (id, birdId) => {
  await Park.updateOne({ _id: id }, { $pull: { birds: birdId } })
})

module.exports = {
  linkBirdParkById,
  unLinkBirdParkById,
  linkBirdParkByName,
  unLinkBirdParkByName,
  removePark,
  removeBird,
}
