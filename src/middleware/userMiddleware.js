const validator = require('validator');
const { User } = require('../models');

const valideEmailPasswordNotNull = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const displayNameLength = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const alreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const hasEmail = await User.findOne({ where: { email } });
  if (hasEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

module.exports = {

  valideEmailPasswordNotNull,
  displayNameLength,
  validateEmail,
  validatePassword,
  alreadyExists };
