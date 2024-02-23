const express = require('express');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const blogPostController = require('./controllers/blogPost.controller');
const validateUser = require('./middleware/userMiddleware');
const validateToken = require('./middleware/tokenMiddleware');
const validateCategory = require('./middleware/categoryMiddleware');
const validateBlogPost = require('./middleware/blogPostMiddleware');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post(
  '/login', 
  validateUser.valideEmailPasswordNotNull, 
  userController.findUser,
);

app.post(
  '/user', 
  validateUser.displayNameLength, 
  validateUser.validateEmail,
  validateUser.validatePassword, 
  validateUser.alreadyExists, 
  userController.createUser,
);

app.get('/user/:id', validateToken.validateToken, userController.getUserById);

app.get('/user', validateToken.validateToken, userController.getAllUsers);

app.post(
  '/categories',
  validateCategory.validateName,
  validateToken.validateToken,
  categoryController.createCategory,
);

app.get('/categories', validateToken.validateToken, categoryController.getAllCategories);

app.post(
  '/post', 
  validateToken.validateToken, 
  validateBlogPost.validateNotEmpty,
  validateBlogPost.validateCategoryIds,
  blogPostController.createPost,
);

app.get('/post/:id', validateToken.validateToken, blogPostController.getPostById);

app.get('/post', validateToken.validateToken, blogPostController.getAllPosts);

app.put(
  '/post/:id', 
  validateToken.validateToken, 
  validateBlogPost.validateUptadePost,
  blogPostController.updatePost,
);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
