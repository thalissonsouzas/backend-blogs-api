const blogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const newPost = await blogPostService.createPost(title, content, categoryIds, id);
  return res.status(201).json(newPost);
};

const getAllPosts = async (_req, res) => {
  const allPosts = await blogPostService.getAllPosts();
  return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;
  const updatedPost = await blogPostService.updatePost(id, title, content, userId);
  if (updatedPost === 'erro') {
    return res.status(401).json({
      message: 'Unauthorized user',
    }); 
  }
  return res.status(200).json(updatedPost);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
