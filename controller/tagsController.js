//  models
const DB = require('../models');

const { BlogTags } = DB;

module.exports = {
  getTagsList: async (_, res, next) => {
    try {
      const tags = await BlogTags.findAll();

      res.status(200).json(tags);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  getTag: async (req, res, next) => {
    try {
      const { id } = req.params;
      const tag = await BlogTags.findOne({ where: { id } });

      if (!tag) return res.sendStatus(404);

      res.status(200).json(tag);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  createTag: async (req, res, next) => {
    try {
      const { name } = req.body;

      const tag = await BlogTags.create({
        name,
      });

      res.status(201).json(tag);
    } catch (e) {
      next(new Error(e.message));
    }
  },

  deleteTag: async (req, res, next) => {
    try {
      const { id } = req.params;
      const tag = await BlogTags.findOne({ where: { id } });

      if (!tag) return res.sendStatus(404);

      await tag.destroy();

      res.sendStatus(204);
    } catch (e) {
      next(new Error(e.message));
    }
  },
};
