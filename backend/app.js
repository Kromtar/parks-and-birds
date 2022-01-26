const express = require('express')
const routes = require('./src/api/v1')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1', routes)

app.get('/', (req, res) => {
  res.send('Hi Fede !')
})

module.exports = app
