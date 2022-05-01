const { Router } = require('express');

//  controllers
const blogController = require('../controller/blogController');
const categoriesController = require('../controller/categoriesController');
const tagsController = require('../controller/tagsController');

// helpers
const validation = require('../middleware/validation');
const { blogSchemaPut, blogSchemaPost, categoryTagPost } = require('../schemas/blog.schema');

const blogsRouter = Router();

blogsRouter.get('/', blogController.getBlogsList);
blogsRouter.get('/categories', categoriesController.getCategoriesList);
blogsRouter.get('/categories/:id', categoriesController.getCategory);
blogsRouter.post('/categories/new', validation(categoryTagPost), categoriesController.createCategory);
blogsRouter.delete('/categories/:id', categoriesController.deleteCategory);
blogsRouter.get('/tags', tagsController.getTagsList);
blogsRouter.get('/tags/:id', tagsController.getTag);
blogsRouter.post('/tags/new', validation(categoryTagPost), tagsController.createTag);
blogsRouter.delete('/tags/:id', tagsController.deleteTag);
blogsRouter.get('/:id', blogController.getBlog);
blogsRouter.post('/new', validation(blogSchemaPost), blogController.createBlog);
blogsRouter.patch('/:id', validation(blogSchemaPut), blogController.updateBlog);
blogsRouter.delete('/:id', blogController.deleteBlog);

module.exports = blogsRouter;
