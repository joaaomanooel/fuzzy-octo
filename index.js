/* eslint-disable no-console */
require('dotenv').config();
const app = require('./src');

app.listen(5000, () => {
  console.log('API is running on port 5000');
});
