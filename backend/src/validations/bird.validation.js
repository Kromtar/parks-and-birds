const Joi = require('joi')
const { objectId } = require('./custom')
const { riskEnum } = require('../models/bird.model')

const createBird = {
  body: Joi.object().keys({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500),
    habitat: Joi.string().max(500),
    length_cm: Joi.number().min(0),
    risk: Joi.string().valid(...riskEnum),
    link: Joi.string().max(300),
  }),
}

const getBird = {
  params: Joi.object().keys({
    bird_id: Joi.string().custom(objectId),
  }),
}

const updateBird = {
  params: Joi.object().keys({
    bird_id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().max(100),
      description: Joi.string().max(500),
      habitat: Joi.string().max(500),
      length_cm: Joi.number().min(0),
      risk: Joi.string().valid(...riskEnum),
      link: Joi.string().max(300),
    })
    // Al menos uno de los campos debe incluirse
    .min(1),
}

const deleteBird = {
  params: Joi.object().keys({
    bird_id: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createBird,
  getBird,
  updateBird,
  deleteBird,
}
