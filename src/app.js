const express = require('express');
const bodyParcer = require('body-parser');

const app = express();

app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: true }));

require('./controllers/authControllers')(app);
require('./controllers/projectsController')(app);

module.exports = app;
