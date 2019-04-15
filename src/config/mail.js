const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
} = process.env;

module.exports = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  user: MAIL_USER,
  pass: MAIL_PASS,
};
