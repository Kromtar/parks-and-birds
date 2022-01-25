const Joi = require('joi')

const createPark = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    region: Joi.string().required(),
    park_type: Joi.string().required(),
    hectares: Joi.number().required(),
    link: Joi.string(),
    birds: Joi.array().items(Joi.string()),
  }),
}

module.exports = {
  createPark,
}
