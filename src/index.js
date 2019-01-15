const express = require('express');
const bodyParcer = require('body-parser');

const app = express();

app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: true }));

require('./app/controllers')(app);

module.exports = app;
