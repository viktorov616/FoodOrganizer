const jimp     = require('jimp');
const mongoose = require('mongoose');
const multer   = require('multer');
const uuid     = require('uuid');

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
  const data = Object.entries(req.body).reduce((result, entry) => ({
    ...result,
    [entry[0]]: (!entry[1]) ? entry[1] : JSON.parse(entry[1]),
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
  const recipe = await (new Recipe(req.body)).save();

  res.json(recipe);
};

exports.getRecipes = async (req, res) => {
  const stores = await Recipe.find();

  res.json(stores);
};

exports.getRecipe = async (req, res) => {
  const { slug } = req.params;
  const store = await Recipe.findOne({ slug });

  res.json(store);
};
