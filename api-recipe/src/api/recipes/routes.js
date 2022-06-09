const routes = (handler) => [
  {
    method: 'POST',
    path: '/recipes',
    handler: handler.postRecipeHandler,
  },
  {
    method: 'GET',
    path: '/recipes',
    handler: handler.getRecipesHandler,
  },
  {
    method: 'GET',
    path: '/recipes/{id}',
    handler: handler.getRecipeByIdHandler,
  },
];

module.exports = routes;
