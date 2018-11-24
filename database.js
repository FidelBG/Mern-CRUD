const mongoose = require('mongoose');
const URI = 'your mongodb connection string here';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
