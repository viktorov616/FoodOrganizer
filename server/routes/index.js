const express = require('express');

const router  = express.Router();

router.get('/api/addRecipe', (req, res) => res.json({ it: 'works!' }));

module.exports = router;
