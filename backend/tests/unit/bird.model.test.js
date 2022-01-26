const { faker } = require('@faker-js/faker')
var ObjectID = require('bson').ObjectID
const { Bird } = require('../../src/models')

describe('Bird model', () => {
  let newBird

  beforeEach(() => {
    newBird = {
      name: faker.random.word(),
      description: faker.random.word(),
      habitat: faker.random.word(),
      length_cm: faker.datatype.number({ min: 1 }),
      risk: faker.random.word(),
      link: faker.random.word(),
      parks: [new ObjectID()],
    }
  })

  test('should correctly validate a valid bird', async () => {
    await expect(new Bird(newBird).validate()).resolves.toBeUndefined()
  })

  test('name prop maxlengh', async () => {
    newBird.name = faker.datatype.string(101)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('name prop required', async () => {
    delete newBird.name
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('description prop maxlengh', async () => {
    newBird.description = faker.datatype.string(501)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('habitat prop maxlengh', async () => {
    newBird.habitat = faker.datatype.string(501)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('length_cm only positives', async () => {
    newBird.length_cm = faker.datatype.number(-10)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('risk prop maxlengh', async () => {
    newBird.risk = faker.datatype.string(51)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })

  test('link prop maxlengh', async () => {
    newBird.link = faker.datatype.string(301)
    await expect(new Bird(newBird).validate()).rejects.toThrow()
  })
})
