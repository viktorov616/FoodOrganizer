const jimp       = require('jimp');
const mongoose   = require('mongoose');
const multer     = require('multer');
const uuid       = require('uuid');
const qs         = require('query-string');

const { random } = require('lodash');

const Recipe = mongoose.model('Recipe');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');

    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  },
};

exports.prepareFormData = multer(multerOptions).single('photo');

exports.parseFormData = (req, res, next) => {
  const data = Object.entries(req.body).reduce((result, [key, value]) => ({
    ...result,
    [key]: (!value) ? value : JSON.parse(value),
  }), {});
  req.body = data;

  return next();
};

exports.resize = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const ext = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${ext}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);

  return next();
};

exports.createRecipe = async (req, res) => {
  req.body.userId = req.user._id;

  const recipe = await (new Recipe(req.body)).save();

  res.json(recipe);
};

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ slug: req.params.slug });

  Object.entries(req.body).forEach(([key, value]) => { recipe[key] = value; });
  // using save instead of findAndUpdate, because of a pre save hook
  const updatedRecipe = await recipe.save();

  res.json(updatedRecipe);
};

exports.getRecipes = async (req, res) => {
  const stores = await Recipe.find({ userId: req.user._id });

  res.json(stores);
};

exports.getRecipe = async (req, res) => {
  const { slug } = req.params;
  const store = await Recipe.findOne({ slug, userId: req.user._id });

  res.json(store);
};

exports.getRandomRecipe = async (req, res) => {
  const { filter } = req.params;
  const parsedFilter = qs.parse(filter);
  const preparedFilter = Object.entries(parsedFilter).reduce((result, [key, value]) => (
    value
      ? {
        ...result,
        [key]: {
          $regex: `.*${value}.*`,
          $options: 'i',
        },
      }
      : result
  ), { userId: req.user._id });
  const filtredRecipes = await Recipe.find(preparedFilter);
  const randomRecipe = filtredRecipes[random(filtredRecipes.length - 1)];

  res.json(randomRecipe);
};
