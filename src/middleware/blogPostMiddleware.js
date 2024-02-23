const { Category } = require('../models');

const validateNotEmpty = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const hasIds = await Category.findAndCountAll({ where: { id: categoryIds } });
  const { count } = hasIds;
  console.log('HAS IDS', count);
  if (count !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

const validateUptadePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validateNotEmpty,
  validateCategoryIds,
  validateUptadePost,
};
