const supertest = require('supertest')
const httpStatus = require('http-status')
const { faker } = require('@faker-js/faker')
const app = require('../../app')
const setupTestDB = require('../testDb')
const { Bird } = require('../../src/models')
const { Park1, insertParks } = require('../fixtures/park.fixture')
const { Bird1, Bird2, Bird3, insertBirds } = require('../fixtures/bird.fixture')
const { linkBirdPark } = require('../fixtures/other.fixture')

setupTestDB()

// Pruebas de integración de los rutas /bird
describe('Bird routes', () => {
  describe('POST /v1/bird', () => {
    let newBird

    beforeEach(() => {
      newBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
    })

    test('should return 201 and successfully create new bird', async () => {
      const res = await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.CREATED)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: newBird.name,
        description: newBird.description,
        habitat: newBird.habitat,
        length_cm: newBird.length_cm,
        risk: newBird.risk,
        link: newBird.link,
        parks: [],
      })

      const dbBird = await Bird.findById(res.body._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: newBird.name,
        description: newBird.description,
        habitat: newBird.habitat,
        length_cm: newBird.length_cm,
        risk: newBird.risk,
        link: newBird.link,
        parks: [],
      })
    })

    test('should return 400 error if name is invalid', async () => {
      newBird.name = faker.datatype.string(101)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if name is undefined', async () => {
      delete newBird.name
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if description is invalid', async () => {
      newBird.description = faker.datatype.string(501)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if habitat is invalid', async () => {
      newBird.habitat = faker.datatype.string(501)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if length_cm is invalid', async () => {
      newBird.length_cm = faker.datatype.number(-10)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if risk is invalid', async () => {
      newBird.risk = faker.datatype.string(51)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if link is invalid', async () => {
      newBird.link = faker.datatype.string(3001)
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if name is repeated', async () => {
      await insertBirds([Bird1])
      newBird = {
        name: Bird1.name,
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      await supertest(app)
        .post('/v1/bird')
        .send(newBird)
        .expect(httpStatus.BAD_REQUEST)
    })
  })

  describe('GET /v1/bird/list', () => {
    test('should return 200 if there are no birds', async () => {
      const res = await supertest(app)
        .get('/v1/bird/list')
        .expect(httpStatus.OK)
      expect(res.body).toEqual({
        results: expect.any(Array),
      })
      expect(res.body.results).toHaveLength(0)
    })

    test('should return 200 if there are birds', async () => {
      await insertBirds([Bird1, Bird2, Bird3])

      const res = await supertest(app)
        .get('/v1/bird/list')
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
      })
      expect(res.body.results).toHaveLength(3)
      expect(res.body.results[0]).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })
    })
  })

  describe('GET /v1/bird/:bird_id', () => {
    test('should return 200 with not embedded by default', async () => {
      await insertBirds([Bird1])
      await insertParks([Park1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/bird/' + Bird1._id)
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [expect.anything()],
      })
    })
  })

  describe('GET /v1/bird/:bird_id', () => {
    test('should return 200 with embedded false', async () => {
      await insertBirds([Bird1])
      await insertParks([Park1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/bird/' + Bird1._id)
        .query({ include_parks: false })
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [expect.anything()],
      })
    })
  })

  describe('GET /v1/bird/:bird_id', () => {
    test('should return 200 with embedded true', async () => {
      await insertBirds([Bird1])
      await insertParks([Park1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/bird/' + Bird1._id)
        .query({ include_parks: true })
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [
          {
            _id: Park1._id.toHexString(),
            name: Park1.name,
            region: Park1.region,
            park_type: Park1.park_type,
            hectares: Park1.hectares,
            link: Park1.link,
          },
        ],
      })
    })

    test('should return 400 error if id is invalid', async () => {
      await supertest(app).get('/v1/bird/aaa').expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      await supertest(app)
        .get('/v1/bird/' + Bird1._id)
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('PATCH /v1/bird/:bird_id', () => {
    test('should return 200 on complete update', async () => {
      await insertBirds([Bird1])

      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }

      const res = await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: updateBird.name,
        description: updateBird.description,
        habitat: updateBird.habitat,
        length_cm: updateBird.length_cm,
        risk: updateBird.risk,
        link: updateBird.link,
        parks: [],
      })

      const dbBird = await Bird.findById(res.body._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: updateBird.name,
        description: updateBird.description,
        habitat: updateBird.habitat,
        length_cm: updateBird.length_cm,
        risk: updateBird.risk,
        link: updateBird.link,
        parks: [],
      })
    })

    test('should return 400 error if name is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.name = faker.datatype.string(101)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if description is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.description = faker.datatype.string(501)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if habitat is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.habitat = faker.datatype.string(501)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if length_cm is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.length_cm = faker.datatype.number(-10)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if risk is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.risk = faker.datatype.string(51)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if link is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      updateBird.link = faker.datatype.string(301)
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if no data defined', async () => {
      const updateBird = {}
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if id is invalid', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/bird/aaa')
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      const updateBird = {
        name: faker.random.word(),
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/bird/' + Bird1._id)
        .send(updateBird)
        .expect(httpStatus.NOT_FOUND)
    })

    test('should return 400 error if name is repeated', async () => {
      await insertBirds([Bird1, Bird2])
      const updateBird = {
        name: Bird1.name,
        description: faker.random.word(),
        habitat: faker.random.word(),
        length_cm: faker.datatype.number({ min: 1 }),
        risk: faker.random.word().toLocaleLowerCase(),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/bird/' + Bird2._id)
        .send(updateBird)
        .expect(httpStatus.BAD_REQUEST)
    })
  })

  describe('DELETE /v1/bird/:bird_id', () => {
    test('should return 200 if it was removed ok', async () => {
      await insertBirds([Bird1])

      const res = await supertest(app)
        .delete('/v1/bird/' + Bird1._id)
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeNull()
    })

    test('should return 400 error if id is invalid', async () => {
      await supertest(app).delete('/v1/bird/aaa').expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      await supertest(app)
        .delete('/v1/bird/' + Bird1._id)
        .expect(httpStatus.NOT_FOUND)
    })
  })
})
