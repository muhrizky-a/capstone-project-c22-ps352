const routes = (handler) => [
  // {
  //   method: 'POST',
  //   path: '/storage',
  //   handler: handler.postBucketHandler,
  // },
  {
    method: 'POST',
    path: '/upload',
    handler: handler.postFileHandler,
    // options: {
    //   payload: {
    //     allow: 'multipart/form-data',
    //     multipart: true,
    //     output: 'stream',
    //     maxBytes: 1024000, // 1MB
    //   },
    // },
  },
];

module.exports = routes;
