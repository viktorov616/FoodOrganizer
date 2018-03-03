const mongoose = require('mongoose');
const slug     = require('slugs');

mongoose.Promise = global.Promise;

const recipeSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  description: String,
  ingredients: [{
    name: {
      type: String,
      required: 'You must supply an ingredient name!',
    },
    amount: String,
  }],
  name: {
    type: String,
    required: 'You must supply a name!',
  },
  photo: String,
  rating: Number,
  slug: String,
  tags: [String],
});

// create slug before saving recipe
// if the recipe with this slug already exist, add an increment to it
recipeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) return next();

  this.slug = slug(this.name);

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const recipesWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (recipesWithSlug.length) {
    this.slug = `${this.slug}-${recipesWithSlug.length + 1}`;
  }

  return next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
