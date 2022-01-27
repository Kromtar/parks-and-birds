/*
 * Genera una conexión a una base de datos de prueba para los test
 * La base de datos se limpia cada vez que inicia y termina un test
 */

const mongoose = require('mongoose')

const db_username = process.env.DATABASE_USERNAME || ''
const db_password = process.env.DATABASE_PASSWORD || ''
const db_replica_set = process.env.DATABASE_REPLICA_SET || ''

const URI = 'mongodb://mongodb:27017/test?replicaSet=' + db_replica_set
const options = {
  auth: {
    username: db_username,
    password: db_password,
  },
  authSource: 'admin',
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(URI, options)
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    )
  })

  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    )
    await mongoose.disconnect()
  })
}

module.exports = setupTestDB
