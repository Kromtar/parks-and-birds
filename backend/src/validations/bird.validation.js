const Joi = require('joi')
const { objectId } = require('./custom')

const createBird = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    habitat: Joi.string(),
    length_cm: Joi.number(),
    risk: Joi.string(),
    link: Joi.string(),
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
      name: Joi.string(),
      description: Joi.string(),
      habitat: Joi.string(),
      length_cm: Joi.number(),
      risk: Joi.string(),
      link: Joi.string(),
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
