const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});
mongoose.connection.on('connecting', () => {
  console.log('connecting');
});

// models
require('./models/Recipe');

const app = require('./server');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
