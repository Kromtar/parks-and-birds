const { faker } = require('@faker-js/faker')
var ObjectID = require('bson').ObjectID
const { Park } = require('../../src/models')

describe('Park model', () => {
  let newPark

  beforeEach(() => {
    newPark = {
      name: faker.random.word(),
      region: faker.random.word(),
      park_type: faker.random.word(),
      hectares: faker.datatype.number({ min: 1 }),
      link: faker.random.word(),
      birds: [new ObjectID()],
    }
  })

  test('should correctly validate a valid park', async () => {
    await expect(new Park(newPark).validate()).resolves.toBeUndefined()
  })

  test('name prop maxlengh', async () => {
    newPark.name = faker.datatype.string(101)
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('name prop required', async () => {
    delete newPark.name
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('region prop maxlengh', async () => {
    newPark.region = faker.datatype.string(101)
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('region prop required', async () => {
    delete newPark.region
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('park_type prop required', async () => {
    delete newPark.park_type
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('hectares only positives', async () => {
    newPark.hectares = faker.datatype.number(-10)
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })

  test('link prop maxlengh', async () => {
    newPark.link = faker.datatype.string(301)
    await expect(new Park(newPark).validate()).rejects.toThrow()
  })
})
