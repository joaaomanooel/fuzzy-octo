const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://fuzzy-octo:fuzzy-octo123@ds225078.mlab.com:25078/fuzzy-octo',
  {
    useNewUrlParser: true,
  },
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
