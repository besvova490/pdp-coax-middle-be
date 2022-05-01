module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsToMany(models.BlogCategories, {
      through: models.BlogPostCategories,
      as: 'categories',
      foreignKey: 'postId',
    });

    BlogPosts.belongsToMany(models.BlogTags, {
      through: models.BlogPostTags,
      as: 'tags',
      foreignKey: 'postId',
    });
  };

  return BlogPosts;
};
