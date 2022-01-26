const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const { Park } = require('../../src/models')

const Park1 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Park 1',
  region: faker.random.word(),
  park_type: faker.random.word().toLocaleLowerCase(),
  hectares: faker.datatype.number({ min: 1 }),
  link: faker.random.word(),
}

const Park2 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Park 2',
  region: faker.random.word(),
  park_type: faker.random.word().toLocaleLowerCase(),
  hectares: faker.datatype.number({ min: 1 }),
  link: faker.random.word(),
}

const Park3 = {
  _id: mongoose.Types.ObjectId(),
  name: 'Park 3',
  region: faker.random.word(),
  park_type: faker.random.word().toLocaleLowerCase(),
  hectares: faker.datatype.number({ min: 1 }),
  link: faker.random.word(),
}

const insertParks = async (parks) => {
  await Park.insertMany(parks.map((park) => park))
}

module.exports = {
  Park1,
  Park2,
  Park3,
  insertParks,
}
