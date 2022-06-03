class StorageHandler {
  constructor(service, validator) {
    this._service = service;

    // this.postBucketHandler = this.postBucketHandler.bind(this);
    this.postFileHandler = this.postFileHandler.bind(this);
  }

  async postFileHandler(request, h) {
    const { bucketName, filePath, destFileName } = request.payload;

    await this._service.uploadFile(bucketName, filePath, destFileName);

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }
}

module.exports = StorageHandler;
