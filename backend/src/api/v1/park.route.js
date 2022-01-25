const express = require('express')
const validate = require('../../utils/validate')

const parkController = require('../../controllers/park.controller')
const parkValidation = require('../../validations/park.validation')

const router = express.Router()

router
  .route('/')
  .post(validate(parkValidation.createPark), parkController.createPark)

router.route('/list').get(parkController.listParks)

router
  .route('/:park_id')
  .get(validate(parkValidation.getPark), parkController.getPark)
  .patch(validate(parkValidation.updatePark), parkController.updatePark)
  .delete(validate(parkValidation.deletePark), parkController.deletePark)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Parks
 *   description: Manejo de Parques
 */

/**
 * @swagger
 * /park:
 *   post:
 *     summary: Crea un Parque
 *     tags: [Parks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - region
 *               - park_type
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: El nombre debe ser único para cada Parque
 *               region:
 *                 type: string
 *                 maxLength: 100
 *                 description: Region geopolítica de donde se localiza el Parque
 *               park_type:
 *                 type: string
 *                 description: Tipo de zona (Parque, Reserva, Manumento)
 *               hectares:
 *                  type: number
 *                  description: Extension del Parque
 *               link:
 *                  type: string
 *                  description: Link a sitio oficial de CONAF
 *             example:
 *               name: Parque Nacional Lauca
 *               region: Arica y Parinacota
 *               park_type: parque
 *               hectares: 137883
 *               link: https://www.conaf.cl/parques/parque-nacional-lauca/
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Park'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *
 *
 * /park/list:
 *   get:
 *     summary: Lista todos los Parques
 *     tags: [Parks]
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Park'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *
 *
 * /park/{id}:
 *   get:
 *     summary: Recupera un Parque
 *     tags: [Parks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del Parque
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   $ref: '#/components/schemas/Park'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Actualiza un Parque
 *     tags: [Parks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del Parque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: El nombre debe ser único para cada Parque
 *               region:
 *                 type: string
 *                 maxLength: 100
 *                 description: Region geopolítica de donde se localiza el Parque
 *               park_type:
 *                 type: string
 *                 description: Tipo de zona (Parque, Reserva, Manumento)
 *               hectares:
 *                  type: number
 *                  description: Extension del Parque
 *               link:
 *                  type: string
 *                  description: Link a sitio oficial de CONAF
 *               birds:
 *                  type: [string]
 *                  description: Ids de las Aves que pueden ser encontradas en este Parque
 *             example:
 *               name: Parque Nacional Lauca
 *               region: Arica y Parinacota
 *               park_type: parque
 *               hectares: 137883
 *               link: https://www.conaf.cl/parques/parque-nacional-lauca/
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Park'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Eliminar un Parque
 *     tags: [Parks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del Parque
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Park'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
