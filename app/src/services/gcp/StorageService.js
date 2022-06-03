const { Storage } = require('@google-cloud/storage');
const serviceAccount = "credentials/storage@c22-ps352-production.json";
const ClientError = require('../../exceptions/ClientError');

class StorageService {
    constructor() {
        this._storage = new Storage({ keyFilename: serviceAccount });
    }

    async createBucket(bucketName) {
        try {

            const [files] = await this._storage.bucket(bucketName).getFiles();

            files.forEach(file => {
                console.log(file.name);
            });
            // Creates the new bucket
            // await this._storage.createBucket(bucketName, {
            //     location: 'ASIA',
            //     storageClass: 'STANDARD',
            // });
            // return bucketName;
        } catch (e) {
            throw new ClientError(e);
        }
    }

    async uploadFile(
        bucketName,
        filePath,
    ) {
        try {
            await this._storage.bucket(bucketName).upload(filePath);

            // return destFileName;
        } catch (e) {
            throw new ClientError(e);
        }
    }
}

module.exports = StorageService;
