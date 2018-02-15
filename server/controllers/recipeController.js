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

exports.upload = multer(multerOptions).single('photo');

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
  try {
    const data = Object.entries(req.body).reduce((result, entry) => ({
      ...result,
      [entry[0]]: (entry[1] instanceof File) ? entry[1] : JSON.parse(entry[1]),
    }), {});
    const recipe = await (new Recipe(data)).save();

    res.json(recipe);
  } catch (error) {
    res.json(req.data);
  }
};

exports.getRecipes = async (req, res) => {
  const stores = await Recipe.find();

  res.json(stores);
};
