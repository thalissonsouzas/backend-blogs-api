const jwt = require('jsonwebtoken');
const userServices = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const getAllUsers = async (_req, res) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(user);
};

const findUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser(email, password);
  if (!user) return res.status(400).json({ message: 'Invalid fields' });
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ ...user.dataValues, password: undefined }, secret, jwtConfig);
  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await userServices.createUser(displayName, email, password, image);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ ...user.dataValues, password: null }, secret, jwtConfig);
  return res.status(201).json({ token });
};
module.exports = {
  getAllUsers,
  findUser,
  createUser,
  getUserById,
};
