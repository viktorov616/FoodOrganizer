const express          = require('express');
const recipeController = require('../controllers/recipeController');
const { catchErrors }  = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/api/recipes', catchErrors(recipeController.getRecipes));
router.get('/api/recipe/:slug', catchErrors(recipeController.getRecipe));

router.post(
  '/api/recipe',
  recipeController.prepareFormData,
  recipeController.parseFormData,
  catchErrors(recipeController.resize),
  catchErrors(recipeController.createRecipe),
);

module.exports = router;
