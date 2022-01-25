const express = require('express')

const parkController = require('../../controllers/park.controller')

const router = express.Router()

router.route('/').post(parkController.createPark)

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
 *               birds:
 *                  type: [string]
 *                  description: Ids de las Aves que pueden ser encontradas en este Parque
 *             example:
 *               name: Parque Nacional Lauca
 *               region: Arica y Parinacota
 *               park_type: parque
 *               hectares: 137883
 *               link: https://www.conaf.cl/parques/parque-nacional-lauca/
 *               birds: []
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Park'
 *       "400":
 *         $ref: '#/components/responses/Duplicate'
 *
 */
