const StorageHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'storage',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new StorageHandler(service);
    server.route(routes(handler));
  },
};
