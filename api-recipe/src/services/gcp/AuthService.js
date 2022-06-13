var admin = require("firebase-admin");
const AuthorizationError = require('../../exceptions/AuthorizationError');

class AuthService {
  constructor(auth) {
    this._auth = auth;
  }

  async authorize(authorization) {
    if (!authorization)
      throw new AuthorizationError('Unauthorized!');

    if (!authorization.startsWith('Bearer'))
      throw new AuthorizationError('Unauthorized!');

    const split = authorization.split('Bearer ')
    const idToken = split[1]

    try {
      await this._auth.auth().verifyIdToken(idToken);
      return true;
    } catch (error) {
      console.log(error);
      throw new AuthorizationError(error.message);
    }
  }
}

module.exports = AuthService;
