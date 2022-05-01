module.exports = (sequelize, DataTypes) => {
  const BlogTags = sequelize.define('BlogTags', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });

  BlogTags.associate = (models) => {
    BlogTags.belongsToMany(models.BlogPosts, {
      through: models.BlogPostTags,
      as: 'posts',
      foreignKey: 'tagId',
    });
  };
  return BlogTags;
};
