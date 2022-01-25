const express = require('express')
const docsRoute = require('./docs.route')
const parkRoute = require('./park.route')
const birdRoute = require('./bird.route')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/park',
    route: parkRoute,
  },
  {
    path: '/bird',
    route: birdRoute,
  },
]

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

// La documentación de Swagger solo queda expuesta en modo development
if (process.env.DOCKER_MODE === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

module.exports = router
