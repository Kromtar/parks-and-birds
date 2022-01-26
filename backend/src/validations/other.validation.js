const Joi = require('joi')

const linkBirdAndParkById = {
  body: Joi.object().keys({
    park_id: Joi.string().required(),
    bird_id: Joi.string().required(),
  }),
}

const linkBirdAndParkByName = {
  body: Joi.object().keys({
    park_name: Joi.string().required(),
    bird_name: Joi.string().required(),
  }),
}

const unLinkBirdAndParkById = {
  body: Joi.object().keys({
    park_id: Joi.string().required(),
    bird_id: Joi.string().required(),
  }),
}

const unLinkBirdAndParkByName = {
  body: Joi.object().keys({
    park_name: Joi.string().required(),
    bird_name: Joi.string().required(),
  }),
}

module.exports = {
  linkBirdAndParkById,
  linkBirdAndParkByName,
  unLinkBirdAndParkById,
  unLinkBirdAndParkByName,
}
