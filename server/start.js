require('dotenv').config({ path: './variables.env' });
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  require('babel-polyfill');
  require('babel-register')({
    presets: [['env', { modules: false }], 'react', 'stage-2'],
    plugins: ['transform-es2015-modules-commonjs', 'transform-decorators-legacy'],
  });
}

const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});
mongoose.connection.on('connecting', () => {
  console.log('connecting');
});

// models
require('./models/Recipe');
require('./models/User');

const app = require('./server');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
