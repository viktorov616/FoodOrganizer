const express          = require('express');
const recipeController = require('../controllers/recipeController');
const userController   = require('../controllers/userController');
const authController   = require('../controllers/authController');

const { catchErrors }  = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/api/recipes', catchErrors(recipeController.getRecipes));
router.get('/api/recipe/:slug', catchErrors(recipeController.getRecipe));
router.get('/api/random/:filter*?', catchErrors(recipeController.getRandomRecipe));

router.post(
  '/api/recipe',
  recipeController.prepareFormData,
  recipeController.parseFormData,
  catchErrors(recipeController.resize),
  catchErrors(recipeController.createRecipe),
);

router.post(
  '/api/recipe/:slug',
  recipeController.prepareFormData,
  recipeController.parseFormData,
  catchErrors(recipeController.resize),
  catchErrors(recipeController.updateRecipe),
);

router.post(
  '/api/register',
  userController.validateRegister,
  userController.register,
  authController.login,
  (req, res) => {
    console.log(req.user);

    res.json(req.user);
  },
);

router.post('/api/logout', authController.logout);

router.get('/api/user', authController.getUser);

module.exports = router;
