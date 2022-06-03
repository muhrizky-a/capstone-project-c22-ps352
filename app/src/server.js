require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

// recipes
const recipes = require('./api/recipes');
const RecipesService = require('./services/gcp/RecipesService');
const RecipesValidator = require('./validator/recipes');

// storage
const storage = require('./api/storage');
const StorageService = require('./services/gcp/StorageService');

const init = async () => {
  const recipesService = new RecipesService();
  const storageService = new StorageService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: recipes,
      options: {
        service: recipesService,
        validator: RecipesValidator,
      },
    },
    {
      plugin: storage,
      options: {
        service: storageService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit sesuai kebutuhan error handling
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // Get statusCode
    const statusCode = response.statusCode || response.output.statusCode;

    // jika terjadi server error, buat response baru
    if (statusCode >= 500 && statusCode <= 599) {
      request.response.output.payload = ({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
    }

    // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
