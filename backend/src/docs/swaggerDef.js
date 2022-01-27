const { version } = require('../../package.json')

const port = process.env.PORT || 5000

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Parques🌲 y sus Aves🐦',
    version,
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
    },
  ],
}

module.exports = swaggerDef
