const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth.json');
const mailer = require('../../modules/mailer');
const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(
    { params },
    authConfig.secret,
    { expiresIn: 86400 },
  );
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exist.' });
    const user = await User.create(req.body);
    user.password = undefined;
    return res.send({
      user,
      token: generateToken({ id: user._id }),
    });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send({ error: 'User not found.' });
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password.' });
  }

  user.password = undefined;

  return res.send({
    user,
    token: generateToken({ id: user._id }),
  });
});

// eslint-disable-next-line consistent-return
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'User not found.' });

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();

    now.setHours(now.getHours() + 1);

    await User.findOneAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    // return res.send({ token, now });
    mailer.sendMail({
      to: email,
      from: 'joaaomanooel@gmail.com',
      template: 'auth/forgotPassword',
      context: { token },
    }, (err) => {
      if (err) return res.status(400).send({ error: 'Cannot send forgot password email.' });
      return res.send();
    });
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again.' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');
    if (!user) return res.status(400).send({ error: 'User not found.' });
    if (token !== user.passwordResetToken) return res.status(400).send({ error: 'Token invalid.' });

    if (new Date() > user.passwordResetExpires) {
      return res.status(400).send({ error: 'Token expired, generate a new one.' });
    }

    user.password = password;

    await user.save();

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Connot reset password, try again' });
  }
});

module.exports = app => app.use('/auth', router);
