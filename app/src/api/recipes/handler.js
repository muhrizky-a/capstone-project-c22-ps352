class RecipesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postRecipeHandler = this.postRecipeHandler.bind(this);
    this.getRecipesHandler = this.getRecipesHandler.bind(this);
    this.getRecipeByIdHandler = this.getRecipeByIdHandler.bind(this);
    this.putRecipeByIdHandler = this.putRecipeByIdHandler.bind(this);
    this.deleteRecipeByIdHandler = this.deleteRecipeByIdHandler.bind(this);
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

  async getRecipesHandler() {
    let recipes = await this._service.getRecipes();

    recipes = recipes.map((e) => {
      const recipe = e["_fieldsProto"];
      const documentId = e._ref._path.segments[1];

      const { name, ingredients } = recipe;
      const newIngredients = ingredients.arrayValue.values.map((i) => i.stringValue);

      return {
        id: documentId,
        name: name.stringValue,
        ingredients: newIngredients,
      }
    });

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
    const ingredients = _fieldsProto.ingredients.arrayValue.values.map((i) => i.stringValue);

    return {
      status: 'success',
      data: {
        recipe: {
          id,
          name,
          ingredients,
        },
      },
    };
  }

  async putRecipeByIdHandler(request) {
    this._validator.validateRecipePayload(request.payload);

    const { id } = request.params;
    await this._service.editRecipeById(id, request.payload);

    return {
      status: 'success',
      message: 'Resep berhasil diperbarui',
    };
  }

  async deleteRecipeByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteRecipeById(id);
    return {
      status: 'success',
      message: 'Resep berhasil dihapus',
    };
  }
}

module.exports = RecipesHandler;
