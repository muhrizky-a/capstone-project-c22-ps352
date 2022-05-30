const InvariantError = require('../../exceptions/InvariantError');
const { RecipePayloadSchema } = require('./schema');

const RecipesValidator = {
  validateRecipePayload: (payload) => {
    const validationResult = RecipePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = RecipesValidator;
