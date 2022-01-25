//Otras rutas para el manejo de relaciones entre los modelos
const express = require('express')
const validate = require('../../utils/validate')

const otherController = require('../../controllers/other.controller')
const otherValidation = require('../../validations/other.validation')

const router = express.Router()

router
  .route('/link_bird_and_park_by_id')
  .post(
    validate(otherValidation.linkBirdAndParkById),
    otherController.linkBirdParkById
  )
router
  .route('/link_bird_and_park_by_name')
  .post(
    validate(otherValidation.linkBirdAndParkByName),
    otherController.linkBirdParkByName
  )

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Other
 *   description: Para manejo de relaciones
 */

/**
 * @swagger
 * /link_bird_and_park_by_id:
 *   post:
 *     summary: Relaciona una Ave y un Parque mediante la Id de cada uno
 *     tags: [Other]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - park_id
 *               - bird_id
 *             properties:
 *               park_id:
 *                 type: string
 *                 description: Id del Parque
 *               bird_id:
 *                 type: string
 *                 description: Id de la Ave
 *     responses:
 *       "200":
 *         description: Ok
 *       "409":
 *         $ref: '#/components/responses/Conflict'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /link_bird_and_park_by_name:
 *   post:
 *     summary: Relaciona una Ave y un Parque mediante el nombre de cada uno
 *     tags: [Other]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - park_name
 *               - bird_name
 *             properties:
 *               park_name:
 *                 type: string
 *                 description: Nombre del Parque
 *               bird_name:
 *                 type: string
 *                 description: Nombre del Ave
 *     responses:
 *       "200":
 *         description: Ok
 *       "409":
 *         $ref: '#/components/responses/Conflict'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
