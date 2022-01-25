const express = require('express')
const validate = require('../../utils/validate')

const birdController = require('../../controllers/bird.controller')
const birdValidation = require('../../validations/bird.validation')

const router = express.Router()

router
  .route('/')
  .post(validate(birdValidation.createBird), birdController.createBird)

router.route('/list').get(birdController.listBirds)

router
  .route('/:bird_id')
  .get(birdController.getBird)
  .patch(birdController.updateBird)
  .delete(birdController.deleteBird)

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
 *             example:
 *               name: Gorrión
 *               description: Partes superiores pardas, manchadas de castaño y negro; lomo y supracaudales gris pardusco. Partes inferiores blanquesinas, lavadas de gris pardusco.
 *               habitat: Marcada preferencia hacia los lugares cercanos al hombre, como jardines, plazas, huertos y chacras de ciudades, pueblos y caserios. Raro hacia las zonas agrestes.
 *               length_cm: 17
 *               risk: Menor riesgo
 *               link: https://www.avesdechile.cl/234.htm
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
 * /bird/list:
 *   get:
 *     summary: Lista todos las Aves
 *     tags: [Birds]
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
 *                     $ref: '#/components/schemas/Bird'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *
 *
 * /bird/{id}:
 *   get:
 *     summary: Recupera una Ave
 *     tags: [Birds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la Ave
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   $ref: '#/components/schemas/Bird'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Actualiza una Ave
 *     tags: [Birds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la Ave
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
 *             example:
 *               name: Gorrión
 *               description: Partes superiores pardas, manchadas de castaño y negro; lomo y supracaudales gris pardusco. Partes inferiores blanquesinas, lavadas de gris pardusco.
 *               habitat: Marcada preferencia hacia los lugares cercanos al hombre, como jardines, plazas, huertos y chacras de ciudades, pueblos y caserios. Raro hacia las zonas agrestes.
 *               length_cm: 17
 *               risk: Menor riesgo
 *               link: https://www.avesdechile.cl/234.htm
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bird'
 *       "400":
 *         $ref: '#/components/responses/Bad'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Eliminar una Ave
 *     tags: [Birds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la Ave
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bird'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
