const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
