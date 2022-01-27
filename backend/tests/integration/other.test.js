const supertest = require('supertest')
const httpStatus = require('http-status')
const app = require('../../app')
const setupTestDB = require('../testDb')
const { Bird, Park } = require('../../src/models')
const { Park1, Park2, insertParks } = require('../fixtures/park.fixture')
const { Bird1, Bird2, insertBirds } = require('../fixtures/bird.fixture')
const { linkBirdPark } = require('../fixtures/other.fixture')

setupTestDB()

// Pruebas de integración de otra rutas
describe('Other routes', () => {
  describe('POST /v1/link_bird_and_park_by_id', () => {
    test('should return 200 and successfully at link', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [Park1._id],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [Bird1._id],
      })
    })

    test('should return 200 and successfully at link even if there is already a relationship', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [Park1._id],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [Bird1._id],
      })
    })

    test('should return 400 error if any id is invalid', async () => {
      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: 'aaa',
          bird_id: Bird1._id,
        })
        .expect(httpStatus.BAD_REQUEST)
      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: 'aaa',
        })
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if any id is wrong', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: Park2._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.NOT_FOUND)
      await supertest(app)
        .post('/v1/link_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird2._id,
        })
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('POST /v1/link_bird_and_park_by_name', () => {
    test('should return 200 and successfully at link', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/link_bird_and_park_by_name')
        .send({
          park_name: Park1.name,
          bird_name: Bird1.name,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [Park1._id],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [Bird1._id],
      })
    })

    test('should return 200 and successfully at link even if there is already a relationship', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/link_bird_and_park_by_name')
        .send({
          park_name: Park1.name,
          bird_name: Bird1.name,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [Park1._id],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [Bird1._id],
      })
    })

    test('should return 404 error if any name is wrong', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/link_bird_and_park_by_name')
        .send({
          park_name: Park2.name,
          bird_name: Bird1.name,
        })
        .expect(httpStatus.NOT_FOUND)
      await supertest(app)
        .post('/v1/link_bird_and_park_by_name')
        .send({
          park_name: Park1.name,
          bird_name: Bird2.name,
        })
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('POST /v1/unlink_bird_and_park_by_id', () => {
    test('should return 200 and successfully at unlink', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })
    })

    test('should return 200 and successfully at unlink even if there is no relationship', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })
    })

    test('should return 400 error if any id is invalid', async () => {
      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: 'aaa',
          bird_id: Bird1._id,
        })
        .expect(httpStatus.BAD_REQUEST)
      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: 'aaa',
        })
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if any id is wrong', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: Park2._id,
          bird_id: Bird1._id,
        })
        .expect(httpStatus.NOT_FOUND)
      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_id')
        .send({
          park_id: Park1._id,
          bird_id: Bird2._id,
        })
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('POST /v1/unlink_bird_and_park_by_name', () => {
    test('should return 200 and successfully at unlink', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_name')
        .send({
          park_name: Park1.name,
          bird_name: Bird1.name,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })
    })

    test('should return 200 and successfully at unlink even if there is no relationship', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_name')
        .send({
          park_name: Park1.name,
          bird_name: Bird1.name,
        })
        .expect(httpStatus.OK)

      const dbBird = await Bird.findById(Bird1._id)
      expect(dbBird).toBeDefined()
      expect(dbBird).toMatchObject({
        _id: expect.anything(),
        name: Bird1.name,
        description: Bird1.description,
        habitat: Bird1.habitat,
        length_cm: Bird1.length_cm,
        risk: Bird1.risk,
        link: Bird1.link,
        parks: [],
      })

      const dbPark = await Park.findById(Park1._id)
      expect(dbPark).toBeDefined()
      expect(dbPark).toMatchObject({
        _id: expect.anything(),
        name: Park1.name,
        region: Park1.region,
        park_type: Park1.park_type,
        hectares: Park1.hectares,
        link: Park1.link,
        birds: [],
      })
    })

    test('should return 404 error if any name is wrong', async () => {
      await insertParks([Park1])
      await insertBirds([Bird1])
      await linkBirdPark(Bird1, Park1)

      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_name')
        .send({
          park_name: Park2.name,
          bird_name: Bird1._id,
        })
        .expect(httpStatus.NOT_FOUND)
      await supertest(app)
        .post('/v1/unlink_bird_and_park_by_name')
        .send({
          park_name: Park1._id,
          bird_name: Bird2.name,
        })
        .expect(httpStatus.NOT_FOUND)
    })
  })
})
