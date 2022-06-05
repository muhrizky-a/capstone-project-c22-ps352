class RecipesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postRecipeHandler = this.postRecipeHandler.bind(this);
    this.getRecipesHandler = this.getRecipesHandler.bind(this);
    this.getRecipeByIdHandler = this.getRecipeByIdHandler.bind(this);
  }

  async postRecipeHandler(request, h) {
    this._validator.validateRecipePayload(request.payload);
    const { name, description, ingredients, steps } = request.payload;

    const recipeId = await this._service.addRecipe({ name, description, ingredients, steps });

    const response = h.response({
      status: 'success',
      message: 'Resep berhasil ditambahkan',
      data: {
        recipeId,
      },
    });
    response.code(201);
    return response;
  }

  async getRecipesHandler(request) {
    let recipes = await this._service.getRecipes(request);

    recipes = recipes.map((e) => {
      const recipe = e["_fieldsProto"];
      const documentId = e._ref._path.segments[1];

      const { name, description, ingredients, steps } = recipe;
      const newIngredients = ingredients.arrayValue.values.map((i) => i.stringValue);
      const newSteps = steps.arrayValue.values.map((i) => i.stringValue);

      return {
        id: documentId,
        name: name.stringValue,
        description: description.stringValue,
        ingredients: newIngredients,
        steps: newSteps,
      }
    })

    if (request.query.name) {
      recipes = recipes.filter((e) => {

        const { name } = e;

        return name
          .toLowerCase()
          .includes(request.query.name.toLowerCase());
      });
    }


    return {
      status: 'success',
      data: {
        recipes,
      },
    };
  }

  async getRecipeByIdHandler(request) {
    const { id } = request.params;
    const recipe = await this._service.getRecipeById(id);

    const { _fieldsProto } = recipe;

    const name = _fieldsProto.name.stringValue;
    const description = _fieldsProto.name.stringValue;
    const ingredients = _fieldsProto.ingredients.arrayValue.values.map((i) => i.stringValue);
    const steps = _fieldsProto.steps.arrayValue.values.map((i) => i.stringValue);

    return {
      status: 'success',
      data: {
        recipe: {
          id,
          name,
          description,
          ingredients,
          steps,
        },
      },
    };
  }
}

module.exports = RecipesHandler;
