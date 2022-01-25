const express = require('express')
const port = process.env.PORT || 5000

const app = express()

app.listen(port, () => {
  console.log('ExpressJs on PORT: ' + port)
})

// Endpoints
app.get('/', (req, res) => {
  res.send('Hi Fede !')
})
