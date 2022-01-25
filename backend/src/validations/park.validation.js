const Joi = require('joi')
const { objectId } = require('./custom')

const createPark = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    region: Joi.string().required(),
    park_type: Joi.string().required(),
    hectares: Joi.number().required(),
    link: Joi.string(),
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
      name: Joi.string(),
      region: Joi.string(),
      park_type: Joi.string(),
      hectares: Joi.number(),
      link: Joi.string(),
    })
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
