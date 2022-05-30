const RecipesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'recipes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const recipesHandler = new RecipesHandler(service, validator);
    server.route(routes(recipesHandler));
  },
};
