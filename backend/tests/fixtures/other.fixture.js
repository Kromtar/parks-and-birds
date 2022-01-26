const mongoose = require('mongoose')
const { Park, Bird } = require('../../src/models')

const linkBirdPark = async (bird, park) => {
  await Park.updateOne({ _id: park._id }, { $addToSet: { birds: bird._id } })
  await Bird.updateOne({ _id: bird._id }, { $addToSet: { parks: park._id } })
}

module.exports = {
  linkBirdPark,
}
