const Joi = require('joi')
const { objectId } = require('./custom')

const createPark = {
  body: Joi.object().keys({
    name: Joi.string().max(100).required(),
    region: Joi.string().max(100).required(),
    park_type: Joi.string().required(),
    hectares: Joi.number().min(0),
    link: Joi.string().max(300),
  }),
}

const getPark = {
  params: Joi.object().keys({
    park_id: Joi.string().custom(objectId),
  }),
}

const updatePark = {
  params: Joi.object().keys({
    park_id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().max(100),
      region: Joi.string().max(100),
      park_type: Joi.string(),
      hectares: Joi.number().min(0),
      link: Joi.string().max(300),
    })
    // Al menos uno de los campos debe incluirse
    .min(1),
}

const deletePark = {
  params: Joi.object().keys({
    park_id: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createPark,
  getPark,
  updatePark,
  deletePark,
}
