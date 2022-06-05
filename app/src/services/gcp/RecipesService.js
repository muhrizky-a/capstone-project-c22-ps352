const { Pool } = require('pg');
var admin = require("firebase-admin");
const Firestore = require('firebase-admin/firestore');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
var serviceAccount = require("../../../credentials/credentials.json")

class RecipesService {
  constructor() {
    this._pool = new Pool();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
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

    if (name) {
      const snapshots = await recipesRef.get();

      return snapshots.docs;
    }

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

  async editRecipeById(id, { name, description, ingredients, steps }) {
    const query = {
      text: 'UPDATE recipes SET name = $1, description = $2, ingredients = $3, steps = $4 WHERE id = $5 RETURNING id',
      values: [name, description, ingredients, steps, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui resep. Id tidak ditemukan');
    }
  }

  async editRecipeImageById(id, { image = null }) {
    const query = {
      text: 'UPDATE recipes SET image = $1 WHERE id = $2 RETURNING id',
      values: [image, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui resep. Id tidak ditemukan');
    }
  }

  async deleteRecipeById(id) {
    const query = {
      text: 'DELETE FROM recipes WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Resep gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = RecipesService;
