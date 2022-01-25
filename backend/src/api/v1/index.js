const express = require('express')
const docsRoute = require('./docs.route')

const router = express.Router()

const defaultRoutes = []

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
