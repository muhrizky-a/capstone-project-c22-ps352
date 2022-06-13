var admin = require("firebase-admin");
const Firestore = require('firebase-admin/firestore');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthService = require("./AuthService");

class RecipesService {
  constructor() {
    admin.initializeApp(
      {
        credential: admin.credential.cert(
          process.env.CREDENTIALS
        ),
      }
    );
    this._firestore = Firestore.getFirestore();

    this._auth = new AuthService(admin);
  }

  async addRecipe({ id = null, name, description, image = null, ingredients, steps, authorization }) {
    const data = {
      name,
      description,
      image,
      ingredients,
      steps,
    };

    const isAuthorized = await this._auth.authorize(authorization);

    let result = await this._firestore.collection('recipes');

    result = (id) ? await result.doc(id).set(data) : await result.add(data);

    if (!result.id && !id) {
      throw new InvariantError('Resep gagal ditambahkan');
    }

    return result.id || id;
  }

  async getRecipes(request) {
    const { name } = request.query;
    const recipesRef = this._firestore.collection('recipes');

    const snapshots = await recipesRef.get();
    return snapshots.docs;
  }

  async getRecipeById(id) {
    const doc = await this._firestore.collection('recipes').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundError('Resep tidak ditemukan');
    }

    return doc;
  }
}

module.exports = RecipesService;
