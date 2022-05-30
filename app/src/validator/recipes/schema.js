const Joi = require('joi');

const RecipePayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  steps: Joi.array().items(Joi.string()).required(),
});

module.exports = { RecipePayloadSchema };
