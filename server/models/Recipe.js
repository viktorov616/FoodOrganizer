const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'You muse supply a name!',
  },
  ingredients: [{
    name: {
      type: String,
      required: 'You muse supply a ingredient name!',
    },
    amount: String,
  }],
  tags: [String],
  description: String,
  rating: Number,
});

module.exports = mongoose.model('Recipe', recipeSchema);
