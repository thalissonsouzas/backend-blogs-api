const { Category } = require('../models');

const createCategory = async (category) => {
  const categoryCreated = await Category.create(category);
  return categoryCreated;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};