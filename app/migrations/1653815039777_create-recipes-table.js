/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('recipes', {
      id: 'id',
      name: {
        type: 'TEXT',
        notNull: true,
      },
      description: {
        type: 'TEXT',
        notNull: true,
      },
      ingredients: {
        type: 'TEXT[]',
        notNull: true,
      },
      steps: {
        type: 'TEXT[]',
        notNull: true,
      },
      image: {
        type: 'TEXT',
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('albums');
  };
  