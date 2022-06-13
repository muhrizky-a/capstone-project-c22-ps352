const Joi = require('joi');

const RecipePayloadSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
  ingredients: Joi.array().items(Joi.string()).required(),
  steps: Joi.array().items(Joi.string()).required(),
});

module.exports = { RecipePayloadSchema };
