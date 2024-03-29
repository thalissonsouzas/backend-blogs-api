const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user;
};

const findUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const user = await User.create(
    { displayName, email, password, image },
  );
  return user;
};

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  getUserById,
};