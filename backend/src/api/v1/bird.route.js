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
  .get(validate(birdValidation.getBird), birdController.getBird)
  .patch(validate(birdValidation.updateBird), birdController.updateBird)
  .delete(validate(birdValidation.deleteBird), birdController.deleteBird)

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
 *               name: Tordo renegrido
 *               description: Totalmente negro con tornasoles violáceos azulados. Pico negro. Patas negras.
 *               habitat: Campos abiertos, terrenos cultivados, lechos de rios, faldeos de cerros, ciudades; hasta unos 2.000 msnm.
 *               length_cm: 20
 *               risk: Menor riesgo
 *               link: https://www.avesdechile.cl/133.htm
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
 *       - in: query
 *         name: include_parks
 *         schema:
 *           type: boolean
 *         description: Para incluir de forma embebida los Parques relacionados al Ave. Por defecto, Falso
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Bird'
 *                 - $ref: '#/components/schemas/BirdExtended'
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
 *               name: Tordo renegrido
 *               description: Totalmente negro con tornasoles violáceos azulados. Pico negro. Patas negras.
 *               habitat: Campos abiertos, terrenos cultivados, lechos de rios, faldeos de cerros, ciudades; hasta unos 2.000 msnm.
 *               length_cm: 20
 *               risk: Menor riesgo
 *               link: https://www.avesdechile.cl/133.htm
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
