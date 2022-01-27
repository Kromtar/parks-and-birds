const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./src/api/v1')

const app = express()

// Para seguridad en los headers HTTP
app.use(helmet())

// Limpieza de request
app.use(xss())
app.use(mongoSanitize())

// Para manejo de formatos en las request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Activa Cors
app.use(cors())
app.options('*', cors())

// Rutas
app.use('/v1', routes)
app.get('/', (req, res) => {
  res.send(
    'Hola RECYLINK !, esta es la API de prueba <b>"Parques🌲 y sus Aves🐦"</b><br><br>Prueba con el endpoint: <a href="http://localhost:5000/v1/park/list">http://localhost:5000/v1/park/list</a> para ver todos los Parques !<br><br> En <i>development</i> puedes encontrar una GUI en  <a href="http://localhost:5000/v1/docs">http://localhost:5000/v1/docs</a>'
  )
})

module.exports = app
