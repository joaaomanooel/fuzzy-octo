const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://fuzzy-octo-api:fuzzy-octo123@ds225078.mlab.com:25078/fuzzy-octo',
  {
    useNewUrlParser: true,
  },
);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
