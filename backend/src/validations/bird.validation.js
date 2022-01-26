const Joi = require('joi')
const { objectId } = require('./custom')

const createBird = {
  body: Joi.object().keys({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500),
    habitat: Joi.string().max(500),
    length_cm: Joi.number().min(0),
    risk: Joi.string().max(50),
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
      risk: Joi.string().max(50),
      link: Joi.string().max(300),
    })
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
