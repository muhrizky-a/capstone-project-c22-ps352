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
  {
    method: 'PUT',
    path: '/recipes/{id}',
    handler: handler.putRecipeByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/recipes/{id}',
    handler: handler.deleteRecipeByIdHandler,
  },
];

module.exports = routes;
