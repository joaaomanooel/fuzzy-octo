const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
