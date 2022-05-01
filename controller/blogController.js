//  models
const DB = require('../models');

const { BlogPosts, BlogCategories, BlogTags } = DB;

module.exports = {
  getBlogsList: async (req, res, next) => {
    try {
      const {
        page = 1,
        pageSize = 10,
        category,
        tag,
      } = req.query;

      const categoryModel = category
        ? {
          model: BlogCategories,
          as: 'categories',
          attributes: ['name', 'id'],
          where: { id: category },
        }
        : {
          model: BlogCategories,
          as: 'categories',
          attributes: ['name', 'id'],
        };

      const tagModel = tag
        ? {
          model: BlogTags,
          as: 'tags',
          attributes: ['name', 'id'],
          where: { id: tag },
        }
        : {
          model: BlogTags,
          as: 'tags',
          attributes: ['name', 'id'],
        };

      const { rows, count } = await BlogPosts.findAndCountAll({
        include: [categoryModel, tagModel],
        distinct: true,
        limit: pageSize,
        offset: pageSize * (page - 1),
      });

      res.status(200).json({
        page,
        pageSize,
        count,
        results: rows,
      });
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getBlog: async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = await BlogPosts.findOne({
        where: { id },
        include: [
          { model: BlogCategories, as: 'categories', attributes: ['name', 'id'] },
          { model: BlogTags, as: 'tags', attributes: ['name', 'id'] },
        ],
      });

      res.status(200).json(post);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  createBlog: async (req, res, next) => {
    const transaction = await DB.sequelize.transaction();

    try {
      const {
        title,
        body,
        categories,
        tags,
      } = req.body;
      const checkIfPostExist = await BlogPosts.findOne({ where: { title } });

      if (checkIfPostExist) return res.status(422).json({ message: { title: 'blog post title should be uniq' } });

      const post = await BlogPosts.create({
        title, body,
      });

      await post.setCategories(categories);
      await post.setTags(tags);

      await transaction.commit();

      res.status(201).json(post);
    } catch (e) {
      await transaction.rollback();

      next(new Error(e.message));
    }
  },

  updateBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { categories, tags, ...body } = req.body;

      const post = await BlogPosts.findOne({ where: { id } });

      if (!post) return res.status(404);

      if (categories) {
        const categoriesList = await BlogCategories.findAll({ where: { id: categories } });

        await post.setCategories(categoriesList);
      }

      if (tags) {
        const tagsList = await BlogTags.findAll({ where: { id: tags } });

        await post.setTags(tagsList);
      }

      const updatedPost = await post.update({ ...body }, { returning: true, plain: true });
      res.status(201).json(updatedPost);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  deleteBlog: async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = await BlogPosts.findOne({ where: { id } });

      if (!post) return res.sendStatus(404);

      await post.destroy();

      res.sendStatus(204);
    } catch (e) {
      next(new Error(e.message));
    }
  },
};
