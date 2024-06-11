const Joi = require("joi");

module.exports = Object.freeze({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
