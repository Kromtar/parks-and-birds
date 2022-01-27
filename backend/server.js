const mongoose = require('mongoose')
const app = require('./app')
mongoose.Promise = global.Promise

const port = process.env.PORT || 5000
const db_username = process.env.DATABASE_USERNAME || ''
const db_password = process.env.DATABASE_PASSWORD || ''
const db_name = process.env.DATABASE_NAME || ''
const db_replica_set = process.env.DATABASE_REPLICA_SET || ''
const mode = process.env.DOCKER_MODE || ''

const URI =
  'mongodb://mongodb:27017/' + db_name + '?replicaSet=' + db_replica_set
const options = {
  auth: {
    username: db_username,
    password: db_password,
  },
  authSource: 'admin',
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

//Conexión a base de datos e inicio de API
mongoose.connect(URI, options, (err) => {
  if (err) {
    console.log(err)
    throw err
  } else {
    console.log('MongoDb connection OK')
    app.listen(port, () => {
      console.log('Running in MODE: ' + mode)
      console.log('ExpressJs on PORT: ' + port)
    })
  }
})
