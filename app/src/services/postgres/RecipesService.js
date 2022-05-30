const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class RecipesService {
  constructor() {
    this._pool = new Pool();
  }

  async addRecipe({ name, description, ingredients, steps }) {
    const query = {
      text: 'INSERT INTO recipes (name, description, ingredients, steps) VALUES($1, $2, $3, $4) RETURNING id',
      values: [name, description, ingredients, steps],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Resep gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getRecipes() {
    const query = {
      text: 'SELECT * FROM recipes',
    };

    let result = await this._pool.query(query);

    return result.rows;
  }

  async getRecipeById(id) {
    const query = {
      text: 'SELECT * FROM recipes WHERE recipes.id = $1',
      values: [id],
    };

    let result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Resep tidak ditemukan');
    }

    return result.rows[0];
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
