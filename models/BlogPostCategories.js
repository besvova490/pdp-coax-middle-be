module.exports = (sequelize, DataTypes) => {
  const BlogPostCategories = sequelize.define('BlogPostCategories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  return BlogPostCategories;
};
