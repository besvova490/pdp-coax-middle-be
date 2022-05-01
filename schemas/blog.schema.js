const Joi = require('joi');

const blogSchemaPut = Joi.object({
  title: Joi.string().min(3).trim(),
  body: Joi.string().trim().min(150),
  categories: Joi.array().items(Joi.number()),
  tags: Joi.array().items(Joi.number()),
});

const blogSchemaPost = Joi.object({
  title: Joi.string().min(3).trim().required(),
  body: Joi.string().trim().min(150).required(),
  categories: Joi.array().items(Joi.number()),
  tags: Joi.array().items(Joi.number()),
});

const categoryTagPost = Joi.object({
  name: Joi.string().min(3).trim().required(),
});

module.exports = {
  blogSchemaPut,
  blogSchemaPost,
  categoryTagPost,
};
