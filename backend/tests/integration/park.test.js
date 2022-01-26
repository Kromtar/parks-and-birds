const supertest = require('supertest')
const httpStatus = require('http-status')
const { faker } = require('@faker-js/faker')
const app = require('../../app')
const setupTestDB = require('../testDb')
const { Park } = require('../../src/models')
const { Park1, Park2, Park3, insertParks } = require('../fixtures/park.fixture')
const { Bird1, insertBirds } = require('../fixtures/bird.fixture')
const { linkBirdPark } = require('../fixtures/other.fixture')

setupTestDB()

describe('Park routes', () => {
  describe('POST /v1/park', () => {
    let newPark

    beforeEach(() => {
      newPark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
    })

    test('should return 201 and successfully create new park', async () => {
      const res = await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.CREATED)

      expect(res.body).toEqual({
        _id: expect.anything(),
        __v: expect.anything(),
        name: newPark.name,
        region: newPark.region,
        park_type: newPark.park_type,
        hectares: newPark.hectares,
        link: newPark.link,
        birds: [],
      })

      const dbPark = await Park.findById(res.body._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: newPark.name,
        region: newPark.region,
        park_type: newPark.park_type,
        hectares: newPark.hectares,
        link: newPark.link,
        birds: [],
      })
    })

    test('should return 400 error if name is invalid', async () => {
      newPark.name = faker.datatype.string(101)
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if name is undefined', async () => {
      delete newPark.name
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if region is invalid', async () => {
      newPark.region = faker.datatype.string(101)
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if region is undefined', async () => {
      delete newPark.region
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if park_type is undefined', async () => {
      delete newPark.park_type
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if hectares is invalid', async () => {
      newPark.hectares = faker.datatype.number(-10)
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if link is invalid', async () => {
      newPark.link = faker.datatype.string(301)
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if name is repeated', async () => {
      await insertParks([Park1])
      newPark = {
        name: Park1.name,
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      await supertest(app)
        .post('/v1/park')
        .send(newPark)
        .expect(httpStatus.BAD_REQUEST)
    })
  })

  describe('GET /v1/park/list', () => {
    test('should return 200 if there are no parks', async () => {
      const res = await supertest(app)
        .get('/v1/park/list')
        .expect(httpStatus.OK)
      expect(res.body).toEqual({
        results: expect.any(Array),
      })
      expect(res.body.results).toHaveLength(0)
    })

    test('should return 200 if there are parks', async () => {
      await insertParks([Park1, Park2, Park3])

      const res = await supertest(app)
        .get('/v1/park/list')
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
      })
      expect(res.body.results).toHaveLength(3)
      expect(res.body.results[0]).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })
    })
  })

  describe('GET /v1/park/:park_id', () => {
    test('should return 200 with not embedded by default', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/park/' + Park1._id)
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [expect.anything()],
      })
    })

    test('should return 200 with embedded false', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/park/' + Park1._id)
        .query({ include_birds: false })
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [expect.anything()],
      })
    })

    test('should return 200 with embedded true', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      const res = await supertest(app)
        .get('/v1/park/' + Park1._id)
        .query({ include_birds: false })
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [
          {
            _id: Bird1._id.toHexString(),
            name: Bird1.name,
            description: Bird1.description,
            habitat: Bird1.habitat,
            length_cm: Bird1.length_cm,
            risk: Bird1.risk,
            link: Bird1.link,
          },
        ],
      })
    })

    test('should return 400 error if id is invalid', async () => {
      await supertest(app).get('/v1/park/aaa').expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      await supertest(app)
        .get('/v1/park/' + Park1._id)
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('PATCH /v1/park/:park_id', () => {
    test('should return 200 on complete update', async () => {
      await insertParks([Park1])

      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }

      const res = await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: updatePark.name,
        region: updatePark.region,
        park_type: updatePark.park_type,
        hectares: updatePark.hectares,
        link: updatePark.link,
        birds: [],
      })
      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: updatePark.name,
        region: updatePark.region,
        park_type: updatePark.park_type,
        hectares: updatePark.hectares,
        link: updatePark.link,
        birds: [],
      })
    })

    test('should return 400 error if name is invalid', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      updatePark.name = faker.datatype.string(101)
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if region is invalid', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      updatePark.region = faker.datatype.string(101)
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if hectares is invalid', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      updatePark.hectares = faker.datatype.number(-10)
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if link is invalid', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      updatePark.link = faker.datatype.string(301)
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if no data defined', async () => {
      const updatePark = {}
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if id is invalid', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/park/aaa')
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      const updatePark = {
        name: faker.random.word(),
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/park/' + Park1._id)
        .send(updatePark)
        .expect(httpStatus.NOT_FOUND)
    })

    test('should return 400 error if name is repeated', async () => {
      await insertParks([Park1, Park2])
      const updatePark = {
        name: Park1.name,
        region: faker.random.word(),
        park_type: faker.random.word().toLocaleLowerCase(),
        hectares: faker.datatype.number({ min: 1 }),
        link: faker.random.word(),
      }
      await supertest(app)
        .patch('/v1/park/' + Park2._id)
        .send(updatePark)
        .expect(httpStatus.BAD_REQUEST)
    })
  })

  describe('DELETE /v1/park/:park_id', () => {
    test('should return 200 if it was removed ok', async () => {
      await insertParks([Park1])

      const res = await supertest(app)
        .delete('/v1/park/' + Park1._id)
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        _id: Park1._id.toHexString(),
        __v: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeNull()
    })

    test('should return 400 error if id is invalid', async () => {
      await supertest(app)
        .delete('/v1/park/aaa')
        .send()
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if id is wrong', async () => {
      await supertest(app)
        .delete('/v1/park/' + Park1._id)
        .send()
        .expect(httpStatus.NOT_FOUND)
    })
  })
})
