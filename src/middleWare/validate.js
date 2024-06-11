const Joi = require("joi");

const validate = (schema) => (request, response, next) => {
  if ("body" in schema) {
    const body = { body: request.body };
    const { error: bodyError } = Joi.compile(schema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(body);

    if (bodyError) {
      const errorMessage = bodyError.details
        .map((details) => details.message)
        .join(", ");
      return response.status(422).json({ error: errorMessage });
    }
  }
  if ("query" in schema) {
    const query = { query: request.query };
    const { error: queryError } = Joi.compile(schema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(query);

    if (queryError) {
      const errorMessage = queryError.details
        .map((details) => details.message)
        .join(", ");
      return response.status(422).json({ error: errorMessage });
    }
  }
  return next();
};

module.exports = validate;
