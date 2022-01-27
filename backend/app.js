const express = require('express')
const routes = require('./src/api/v1')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/v1', routes)
app.get('/', (req, res) => {
  res.send(
    'Hola RECYLINK !, esta es la API de prueba <b>"Parques🌲 y sus Aves🐦"</b><br><br>Prueba con el endpoint: <a href="http://localhost:5000/v1/park/list">http://localhost:5000/v1/park/list</a> para ver todos los Parques !<br><br> En <i>development</i> puedes encontrar una GUI en  <a href="http://localhost:5000/v1/docs">http://localhost:5000/v1/docs</a>'
  )
})

module.exports = app
