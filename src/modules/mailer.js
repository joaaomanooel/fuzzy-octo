/* eslint-disable object-curly-newline */
const nodemailer = require('nodemailer');
const { host, port, user, pass } = require('../config/mail.json');

module.exports = nodemailer.createTransport({ host, port, auth: { user, pass } });
