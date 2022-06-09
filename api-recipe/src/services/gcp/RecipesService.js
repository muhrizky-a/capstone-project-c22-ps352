var admin = require("firebase-admin");
const Firestore = require('firebase-admin/firestore');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class RecipesService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        process.env.CREDENTIALS
      )
    });
    this._firestore = Firestore.getFirestore();
  }

  async addRecipe({ name, description, ingredients, steps }) {
    const data = {
      name,
      description,
      ingredients,
      steps,
    };

    const result = await this._firestore.collection('recipes').add(data);

    if (!result.id) {
      throw new InvariantError('Resep gagal ditambahkan');
    }

    return result.id;
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
