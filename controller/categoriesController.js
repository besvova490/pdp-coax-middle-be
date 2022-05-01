//  models
const DB = require('../models');

const { BlogCategories } = DB;

module.exports = {
  getCategoriesList: async (_, res, next) => {
    try {
      const categories = await BlogCategories.findAll();

      res.status(200).json(categories);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await BlogCategories.findOne({ where: { id } });

      if (!category) return res.sendStatus(404);

      res.status(200).json(category);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const { name } = req.body;

      const posts = await BlogCategories.create({
        name,
      });

      res.status(201).json(posts);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await BlogCategories.findOne({ where: { id } });

      if (!category) return res.sendStatus(404);

      await category.destroy();

      res.sendStatus(204);
    } catch (e) {
      next(new Error(e.message));
    }
  },
};
