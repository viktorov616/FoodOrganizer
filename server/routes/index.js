const express          = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/api/recipes', recipeController.getRecipes);
router.post('/api/recipe', recipeController.createRecipe);

module.exports = router;
