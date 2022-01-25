const Joi = require('joi')

const createBird = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    habitat: Joi.string(),
    length_cm: Joi.number(),
    risk: Joi.string(),
    link: Joi.string(),
    parks: Joi.array().items(Joi.string()),
  }),
}

module.exports = {
  createBird,
}
