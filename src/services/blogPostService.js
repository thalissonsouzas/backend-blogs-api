const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const newPost = await BlogPost.create({ title, content, userId });
  console.log('NEEEEW POST', newPost.dataValues.id);
  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ postId: newPost.dataValues.id, categoryId });
  });
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  }); 
  return post;
};

const updatePost = async (id, title, content, userId) => {
  const post = await BlogPost.findByPk(id);
  if (post.userId !== userId) {
    const err = 'erro';
    return err;
  }
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const afterUpdate = await getPostById(id);
  return afterUpdate;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
