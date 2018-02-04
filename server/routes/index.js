const express = require('express');

const router  = express.Router();
router.get('/api/test', (req, res) => res.json({ it: 'suck' }));

router.post('/api/add-recipe', (req, res) => {
  res.json({ it: 'works!' });
});

module.exports = router;
