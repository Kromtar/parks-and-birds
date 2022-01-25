const express = require('express')

const birdController = require('../../controllers/bird.controller')

const router = express.Router()

router.route('/bird').post(birdController.createBird)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Birds
 *   description: Manejo de Aves
 */

/**
 * @swagger
 * /bird:
 *   post:
 *     summary: Crea un Ave
 *     tags: [Birds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: El nombre debe ser único para cada Ave
 *               description:
 *                 type: string
 *                 maxLength: 500
 *               habitat:
 *                 type: string
 *                 maxLength: 500
 *               length_cm:
 *                  type: number
 *                  description: Extension promedio de las alas del Ave
 *               risk:
 *                  type: string
 *                  description: Nivel de riesgo de extinción según estándar iucnredlist.org
 *               link:
 *                  type: string
 *                  description: Link a referencia externa del Ave
 *               parks:
 *                  type: [string]
 *                  description: Ids de las Parques donde puede ser vista esta Ave
 *             example:
 *               name: Gorrión
 *               description: Partes superiores pardas, manchadas de castaño y negro; lomo y supracaudales gris pardusco. Partes inferiores blanquesinas, lavadas de gris pardusco.
 *               habitat: Marcada preferencia hacia los lugares cercanos al hombre, como jardines, plazas, huertos y chacras de ciudades, pueblos y caserios. Raro hacia las zonas agrestes.
 *               length_cm: 17
 *               risk: Menor riesgo
 *               link: https://www.avesdechile.cl/234.htm
 *               parks: []
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
