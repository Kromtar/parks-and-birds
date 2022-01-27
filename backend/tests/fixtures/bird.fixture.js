const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const { risk_enum } = require('../../src/models/bird.model')
const { Bird } = require('../../src/models')

const Bird1 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Bird 1',
  description: faker.random.word(),
  habitat: faker.random.word(),
  length_cm: faker.datatype.number({ min: 1 }),
  risk: faker.random.arrayElement(risk_enum),
  link: faker.random.word(),
}

const Bird2 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Bird 2',
  description: faker.random.word(),
  habitat: faker.random.word(),
  length_cm: faker.datatype.number({ min: 1 }),
  risk: faker.random.arrayElement(risk_enum),
  link: faker.random.word(),
}

const Bird3 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Bird 3',
  description: faker.random.word(),
  habitat: faker.random.word(),
  length_cm: faker.datatype.number({ min: 1 }),
  risk: faker.random.arrayElement(risk_enum),
  link: faker.random.word(),
}

const insertBirds = async (birds) => {
  await Bird.insertMany(birds.map((bird) => bird))
}

module.exports = {
  Bird1,
  Bird2,
  Bird3,
  insertBirds,
}
