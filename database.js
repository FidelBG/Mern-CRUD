const mongoose = require('mongoose');
const URI = 'mongodb://dbuser:xxxxxxx@ds125362.mlab.com:25362/react-express';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
